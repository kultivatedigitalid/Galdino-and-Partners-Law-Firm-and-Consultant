(() => {
  const stage = document.querySelector('[data-regulatory-stage]');
  const canvas = stage?.querySelector('canvas');
  if (!stage || !canvas) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const deviceMemory = navigator.deviceMemory || 4;
  const lowEndDevice = deviceMemory <= 2 && window.innerWidth < 900;
  let started = false;
  let running = false;
  let animationFrame = 0;
  let lastFrame = 0;
  let scrollProgress = 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  if (lowEndDevice) {
    stage.dataset.webglState = 'fallback';
    stage.dataset.webglReason = 'low-end';
    return;
  }

  const vertexSource = `
    attribute vec3 aPosition;
    uniform float uAspect;
    uniform float uPointSize;
    void main() {
      float depth = 4.9 - aPosition.z;
      vec2 projected = vec2((aPosition.x / depth) / uAspect, aPosition.y / depth) * 3.2;
      gl_Position = vec4(projected, 0.0, 1.0);
      gl_PointSize = uPointSize * (5.2 / depth);
    }
  `;

  const fragmentSource = `
    precision mediump float;
    uniform vec4 uColor;
    uniform float uRoundPoints;
    void main() {
      float alpha = uColor.a;
      if (uRoundPoints > 0.5) {
        vec2 p = gl_PointCoord * 2.0 - 1.0;
        float d = dot(p, p);
        if (d > 1.0) discard;
        alpha *= smoothstep(1.0, 0.46, d);
      }
      gl_FragColor = vec4(uColor.rgb, alpha);
    }
  `;

  function compile(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || 'Shader compilation failed');
    }
    return shader;
  }

  function createProgram(gl) {
    const program = gl.createProgram();
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'Program link failed');
    }
    return program;
  }

  function createNetwork() {
    const nodes = [{ x: 0, y: 0, z: 0.72, group: 3 }];
    const ringCounts = [8, 12, 16];
    const radii = [0.72, 1.28, 1.88];

    ringCounts.forEach((count, ringIndex) => {
      for (let i = 0; i < count; i += 1) {
        const angle = (i / count) * Math.PI * 2 + ringIndex * 0.32;
        const wave = Math.sin(angle * 3 + ringIndex) * 0.16;
        nodes.push({
          x: Math.cos(angle) * radii[ringIndex],
          y: Math.sin(angle) * radii[ringIndex] * 0.82,
          z: wave + (ringIndex - 1) * -0.26,
          group: i % Math.max(2, Math.round(count / 4)) === 0 ? 2 : ringIndex,
        });
      }
    });

    const edges = [];
    let offset = 1;
    ringCounts.forEach((count, ringIndex) => {
      for (let i = 0; i < count; i += 1) {
        const current = offset + i;
        edges.push([current, offset + ((i + 1) % count)]);
        if (ringIndex === 0) {
          edges.push([0, current]);
        } else {
          const previousCount = ringCounts[ringIndex - 1];
          const previousOffset = offset - previousCount;
          const parent = previousOffset + Math.round((i / count) * previousCount) % previousCount;
          edges.push([current, parent]);
        }
      }
      offset += count;
    });
    return { nodes, edges };
  }

  function rotateNode(node, time) {
    const yRotation = (reducedMotion ? 0.16 : time * 0.00009) + pointer.x * 0.28;
    const xRotation = -0.18 + pointer.y * 0.18 + scrollProgress * 0.08;
    const cosY = Math.cos(yRotation);
    const sinY = Math.sin(yRotation);
    const cosX = Math.cos(xRotation);
    const sinX = Math.sin(xRotation);
    const pulse = reducedMotion ? 1 : 1 + Math.sin(time * 0.0007 + node.group) * 0.018;
    const x0 = node.x * pulse;
    const y0 = node.y * pulse;
    const z0 = node.z;
    const x1 = x0 * cosY - z0 * sinY;
    const z1 = x0 * sinY + z0 * cosY;
    const y1 = y0 * cosX - z1 * sinX;
    const z2 = y0 * sinX + z1 * cosX;
    return [x1, y1, z2 + scrollProgress * 0.22];
  }

  function initialize() {
    if (started) return;
    started = true;

    let gl;
    try {
      gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        depth: false,
        powerPreference: 'low-power',
        preserveDrawingBuffer: false,
      });
      if (!gl) throw new Error('WebGL unavailable');

      const program = createProgram(gl);
      const network = createNetwork();
      const pointBuffer = gl.createBuffer();
      const lineBuffer = gl.createBuffer();
      const highlightBuffer = gl.createBuffer();
      const positionLocation = gl.getAttribLocation(program, 'aPosition');
      const aspectLocation = gl.getUniformLocation(program, 'uAspect');
      const pointSizeLocation = gl.getUniformLocation(program, 'uPointSize');
      const colorLocation = gl.getUniformLocation(program, 'uColor');
      const roundLocation = gl.getUniformLocation(program, 'uRoundPoints');
      let transformed = [];

      gl.useProgram(program);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
      gl.disable(gl.DEPTH_TEST);

      function resize() {
        const rect = canvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        const width = Math.max(1, Math.floor(rect.width * ratio));
        const height = Math.max(1, Math.floor(rect.height * ratio));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
        }
        gl.viewport(0, 0, width, height);
        gl.uniform1f(aspectLocation, width / height);
      }

      function bindAndDraw(buffer, values, mode, color, size, round) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        gl.uniform4fv(colorLocation, color);
        gl.uniform1f(pointSizeLocation, size);
        gl.uniform1f(roundLocation, round ? 1 : 0);
        gl.drawArrays(mode, 0, values.length / 3);
      }

      function render(time) {
        if (!running) return;
        const frameInterval = reducedMotion ? 250 : 16;
        if (time - lastFrame < frameInterval) {
          animationFrame = requestAnimationFrame(render);
          return;
        }
        lastFrame = time;
        pointer.x += (pointer.tx - pointer.x) * 0.045;
        pointer.y += (pointer.ty - pointer.y) * 0.045;
        resize();
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        transformed = network.nodes.map((node) => rotateNode(node, time));
        const allPoints = transformed.flat();
        const lines = [];
        network.edges.forEach(([a, b]) => lines.push(...transformed[a], ...transformed[b]));
        const highlights = [];
        network.nodes.forEach((node, index) => {
          if (node.group >= 2) highlights.push(...transformed[index]);
        });

        bindAndDraw(lineBuffer, lines, gl.LINES, [0.16, 0.78, 0.72, 0.18], 1, false);
        bindAndDraw(pointBuffer, allPoints, gl.POINTS, [0.28, 0.88, 0.78, 0.62], 5.2, true);
        bindAndDraw(highlightBuffer, highlights, gl.POINTS, [0.94, 0.69, 0.35, 0.95], 9.5, true);

        animationFrame = requestAnimationFrame(render);
      }

      const observer = new ResizeObserver(resize);
      observer.observe(canvas);
      stage.dataset.webglState = 'active';
      running = !document.hidden;
      animationFrame = requestAnimationFrame(render);

      stage.addEventListener('pointermove', (event) => {
        const rect = stage.getBoundingClientRect();
        pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      }, { passive: true });

      stage.addEventListener('pointerleave', () => {
        pointer.tx = 0;
        pointer.ty = 0;
      }, { passive: true });

      window.addEventListener('scroll', () => {
        scrollProgress = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
      }, { passive: true });

      document.addEventListener('visibilitychange', () => {
        running = !document.hidden;
        cancelAnimationFrame(animationFrame);
        if (running) animationFrame = requestAnimationFrame(render);
      });

      canvas.addEventListener('webglcontextlost', (event) => {
        event.preventDefault();
        running = false;
        stage.dataset.webglState = 'fallback';
      });
    } catch (error) {
      stage.dataset.webglState = 'fallback';
      stage.dataset.webglReason = 'unavailable';
    }
  }

  const startWhenReady = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(initialize, { timeout: 1200 });
    } else {
      window.setTimeout(initialize, 120);
    }
  };

  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver((entries, observer) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        startWhenReady();
      }
    }, { rootMargin: '180px', threshold: 0.05 });
    visibilityObserver.observe(stage);
  } else {
    startWhenReady();
  }
})();
