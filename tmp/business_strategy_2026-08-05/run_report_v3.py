import build_report as br


_original_add_table = br.add_table


def _safe_add_table(doc, headers, rows, widths, **kwargs):
    widths = list(widths)
    delta = br.CONTENT_W - sum(widths)
    if delta:
        target = 1 if len(widths) > 1 else 0
        widths[target] += delta
    normalized_rows = []
    for row in rows:
        row = list(row)
        if len(row) > len(headers):
            row = row[:len(headers)-1] + [" | ".join(str(v) for v in row[len(headers)-1:])]
        elif len(row) < len(headers):
            row += [""] * (len(headers) - len(row))
        normalized_rows.append(row)
    return _original_add_table(doc, headers, normalized_rows, widths, **kwargs)


br.add_table = _safe_add_table
br.CONTENT_STRATEGY = [
    [row[0], row[1], row[2], f"{row[3]} | Existing asset: {row[4]}", row[5], row[6], row[7]]
    for row in br.CONTENT_STRATEGY
]
service_weight_sum = sum(weight for _key, _label, _direction, weight in br.CRITERIA)
for service in br.SERVICES:
    service["composite"] = round(service["composite"] / service_weight_sum, 2)

br.build_doc()
br.export_json()
print(br.DOCX_PATH)
print(br.JSON_PATH)

