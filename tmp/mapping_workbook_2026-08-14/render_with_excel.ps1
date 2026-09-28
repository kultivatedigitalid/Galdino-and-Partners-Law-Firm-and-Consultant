$ErrorActionPreference = 'Stop'
$workbookPath = 'C:\Users\Joshua\OneDrive\Documents\Law\outputs\galdino_partner\fase2\GP_Fase2_Website_Content_Sheet_Mapping_Aligned_2026-08-14.xlsx'
$outputDir = 'C:\Users\Joshua\OneDrive\Documents\Law\tmp\mapping_workbook_2026-08-14\excel_renders'
New-Item -ItemType Directory -Path $outputDir -Force | Out-Null

$targets = @{
  '09_Page_Section_Mapping' = 'A1:AE14'
  '10_Asset_Register' = 'A1:P12'
  '11_Reference_Register' = 'A1:M12'
  '12_Mapping_QA' = 'A1:U26'
}

$excel = New-Object -ComObject Excel.Application
$excel.Visible = $false
$excel.DisplayAlerts = $false
$excel.ScreenUpdating = $false
$workbook = $null

try {
  $workbook = $excel.Workbooks.Open($workbookPath, 0, $true)
  foreach ($sheetName in $targets.Keys) {
    $sheet = $workbook.Worksheets.Item($sheetName)
    $sheet.Activate() | Out-Null
    $range = $sheet.Range($targets[$sheetName])
    $range.CopyPicture(1, 2)
    $chartObject = $sheet.ChartObjects().Add(0, 0, $range.Width, $range.Height)
    $chartObject.Chart.Paste() | Out-Null
    $pngPath = Join-Path $outputDir ($sheetName + '.png')
    $chartObject.Chart.Export($pngPath, 'PNG') | Out-Null
    $chartObject.Delete()
    [PSCustomObject]@{
      Sheet = $sheetName
      Range = $targets[$sheetName]
      UsedRows = $sheet.UsedRange.Rows.Count
      UsedColumns = $sheet.UsedRange.Columns.Count
      Row3Height = $sheet.Rows.Item(3).RowHeight
      Export = $pngPath
    }
  }
}
finally {
  if ($null -ne $workbook) { $workbook.Close($false) }
  $excel.Quit()
  if ($null -ne $range) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($range) }
  if ($null -ne $sheet) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($sheet) }
  if ($null -ne $workbook) { [void][Runtime.InteropServices.Marshal]::ReleaseComObject($workbook) }
  [void][Runtime.InteropServices.Marshal]::ReleaseComObject($excel)
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}
