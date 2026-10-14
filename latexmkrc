# Build with XeLaTeX (required for fontspec, Arabic and RTL).
# Overleaf reads this file and uses XeLaTeX even if the menu says pdfLaTeX.
$pdf_mode = 5;
$xelatex = 'xelatex -interaction=nonstopmode -file-line-error %O %S';
