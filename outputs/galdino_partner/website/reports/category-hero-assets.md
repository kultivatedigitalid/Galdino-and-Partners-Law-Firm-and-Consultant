# Category hero assets

Generated with the built-in image_gen tool. Final assets are saved in the project; the original service photography is preserved.

The two layers share a canvas per category. Background plates contain no people. Foreground assets retain alpha transparency. Only category pages use the new hero. In CSS, the backdrop uses saturation 0.16 and opacity 0.72; people use saturation 0.4. The background stays visible, and the people enter with a 500 ms delay, a 620 ms fade and a 22 px upward movement. Reduced-motion and no-JavaScript views show the complete hero immediately.

| Category | Layer | Final asset |
|---|---|---|
| reklame | backdrop | src/assets/category-heroes/reklame-backdrop.webp |
| reklame | people | src/assets/category-heroes/reklame-people.webp |
| tata-ruang | backdrop | src/assets/category-heroes/tata-ruang-backdrop.webp |
| tata-ruang | people | src/assets/category-heroes/tata-ruang-people.webp |
| bangunan-konstruksi | backdrop | src/assets/category-heroes/bangunan-konstruksi-backdrop.webp |
| bangunan-konstruksi | people | src/assets/category-heroes/bangunan-konstruksi-people.webp |
| lingkungan | backdrop | src/assets/category-heroes/lingkungan-backdrop.webp |
| lingkungan | people | src/assets/category-heroes/lingkungan-people.webp |
| lalu-lintas-akses | backdrop | src/assets/category-heroes/lalu-lintas-akses-backdrop.webp |
| lalu-lintas-akses | people | src/assets/category-heroes/lalu-lintas-akses-people.webp |
| iso | backdrop | src/assets/category-heroes/iso-backdrop.webp |
| iso | people | src/assets/category-heroes/iso-people.webp |

## Source photographs

- reklame: service-signage.webp
- tata-ruang: experience-investment-project.png
- bangunan-konstruksi: service-building.webp
- lingkungan: service-environment.webp
- lalu-lintas-akses: service-traffic.webp
- iso: service-audit.webp

## Prompt set

Each source was supplied through referenced_image_paths. Backdrop requests used transparent_background=false; people requests used transparent_background=true.

### Reklame backdrop

Use case: precise-object-edit. Edit target is the supplied shop-signage photo. Produce a clean background plate for a layered website hero. Remove BOTH foreground technicians completely, including their helmets, clothing, hands, papers, tools and measuring tape; also remove distant pedestrians. Reconstruct the unobstructed shop facade and sidewalk naturally. Keep the EXACT original camera, full uncropped 3:2 canvas, architectural geometry, object positions and natural colors. Do not zoom, crop, move the shop or add objects. Preserve the existing simple storefront and calm city context, avoiding any extra signs, logos, visual decoration or lettering. The location alone must remain, without any people. Photorealistic, restrained, clean.

### Reklame people

Use case: background-extraction. Edit target is the supplied shop-signage photo. Create a genuine transparent PNG cutout of ONLY BOTH foreground technicians, including the papers held by the left technician, gloves, tool belt and the measuring tape held by the right technician. Remove all storefront, street, distant people, ladders, vegetation and scenery to transparent alpha. Preserve their exact faces, poses, uniforms, sizes and exact pixel positions relative to the original full UNCROPPED 3:2 canvas. Do not recenter or scale people; keep the original empty margins as transparency. Natural clean hair/helmet and tool edges, no glow, no outline, no shadow, no colored or white background. It must register in exactly the same position over the original photograph.

### Tata ruang and bangunan konstruksi backdrop template

Use case: precise-object-edit. Edit the supplied photograph into an empty background plate for a layered website hero. Remove {people} completely and remove any other people. Inpaint the newly exposed environment naturally. Preserve {place}. Keep EXACTLY the same original full uncropped canvas, aspect ratio, camera perspective, scene geometry and object coordinates. No zoom, no crop, no repositioning, no new props, no signage or typography. A calm photorealistic location with no people, natural restrained colors. Preserve tabletop and unheld site objects where present.

### Tata ruang and bangunan konstruksi people template

Use case: background-extraction. Edit the supplied photograph. Output a genuine transparent-alpha cutout of ONLY {people}. Remove ALL scenery, floor, table, laptop and objects they are not holding. Keep exact original faces, clothing, poses, sizes, and pixel positions relative to the full original UNCROPPED canvas. Preserve source aspect ratio and full frame dimensions; empty areas stay transparent. DO NOT recenter, move, enlarge or crop the subjects. Preserve clean natural edges with no glow, no shadow, no artificial outline. Transparent background, not white or checkerboard. This layer must register exactly over the original photo.

### Lingkungan, lalu lintas and ISO backdrop template

Use case: precise-object-edit. Edit the supplied photograph into a clean empty background plate for a layered website hero. Remove {people} completely; remove ALL other people including distant workers. Reconstruct the exposed environment naturally. Preserve {place}. Keep EXACTLY the same original full uncropped 3:2 canvas, camera perspective, architectural geometry and object coordinates. No zoom, no crop, no repositioning, no new props, no signage or typography. A calm photorealistic location without any people, natural restrained colors. Keep stationary site objects.

### Lingkungan, lalu lintas and ISO people template

Use case: background-extraction. Edit the supplied photograph. Create a genuine transparent-alpha PNG cutout of ONLY {people}. Remove ALL scenery and stationary site objects, and remove any background workers. Keep exact original faces, poses, clothing, sizes, and pixel positions relative to the full original UNCROPPED 3:2 frame. Preserve full original empty margins as transparent alpha. DO NOT recenter, move, enlarge or crop the subjects. Preserve natural clean edges. No glow, no background blur, no black or white matte, no shadow, no outline. Actual alpha transparency everywhere outside the people and handheld objects. This layer must register exactly over the original photograph.

### Template variables

| Category | people | place |
|---|---|---|
| tata-ruang | the two foreground project professionals, including only their hands resting on the plans | the construction site, cranes, distant buildings, and the foreground planning table with its laptop, papers and phone |
| bangunan-konstruksi | both foreground building inspectors in hard hats, including the rolled building plans they are holding | the unfinished building interior with concrete columns, floor, windows and distant city |
| lingkungan | the two foreground environmental technicians in hard hats, their handheld clipboard, sampling bottle and sampling pole | the water-treatment facility, tanks, railings, concrete basin, water and stationary sampling crate |
| lalu-lintas-akses | the two foreground traffic surveyors in high-visibility vests, including their clipboard, pen and handheld counter | the industrial access road, curb, trees, warehouse facades and trucks |
| iso | the two FOREGROUND auditors in white coats and hairnets, including the clipboard and pen they hold | the food-production facility, stainless steel equipment and production conveyor |
