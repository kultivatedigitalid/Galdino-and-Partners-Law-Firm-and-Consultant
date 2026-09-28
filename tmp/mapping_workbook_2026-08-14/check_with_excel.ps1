$ErrorActionPreference = 'Stop'
$workbookPath = 'C:\Users\Joshua\OneDrive\Documents\Law\outputs\galdino_partner\fase2\GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx'
$targets = @('09_Page_Section_Mapping', '10_Asset_Register', '11_Reference_Register', '12_Mapping_QA')
$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$workbook = $null
try {
  $workbook = $excel.Workbooks.Open($workbookPath, 0, $true)
  foreach ($sheetName in $targets) {
    $sheet = $workbook.Worksheets.Item($sheetName)
    $formulaCount = 0
    try { $formulaCount = $sheet.UsedRange.SpecialCells(-4123).Count } catch { $formulaCount = 0 }
    [PSCustomObject]@{
      Sheet = $sheetName
      UsedRows = $sheet.UsedRange.Rows.Count
      UsedColumns = $sheet.UsedRange.Columns.Count
      A1 = $sheet.Range('A1').Text
      A4 = $sheet.Range('A4').Text
      Row3Height = $sheet.Rows.Item(3).RowHeight
      Row4Height = $sheet.Rows.Item(4).RowHeight
      FormulaCount = $formulaCount
      ReadOnly = $workbook.ReadOnly
    }
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($sheet)
  }
}
finally {
  if ($null -ne $workbook) { $workbook.Close($false) }
  $excel.Quit()
  if ($null -ne $workbook) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($workbook) }
  [void][Runtime.InteropServices.Marshal]::ReleaseComObject($excel)
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
