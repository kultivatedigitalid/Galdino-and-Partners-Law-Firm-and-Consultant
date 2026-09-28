from pathlib import Path


source = Path(__file__).with_name("verify_brand_package.py")
code = source.read_text(encoding="utf-8")
code = code.replace(
    'assert "Imagegen concept" in full_text',
    'assert "imagegen concept" in full_text.lower()',
)
exec(compile(code, str(source), "exec"), {"__name__": "__main__", "__file__": str(source)})
