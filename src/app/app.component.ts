import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { jsPDF } from 'jspdf'

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pdf-generator';

  generatePDF() {
    const data = document.getElementById('htmlData')!;
    html2canvas(data).then(canvas => {
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('html-to-pdf.pdf');
    });
  }

  printPDF() {
    const printContent = document.getElementById('htmlData');
    const windowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    windowPrt!.document.write(`
      <html>
      <head>
        <title>Print Divs</title>
        <style>
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .htmlData {
              background-color: lightblue !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              margin: 10px;
              padding: 10px;
            }

            .body-data {
    background-color: aqua;
    border-width: 2cm;
    border-color: black;
    height:10rem;
    width: 80%;
}
          }
        </style>
      </head>
      <body>${printContent?.outerHTML}</body>
      </html>
    `);
    windowPrt!.document.close();
    windowPrt!.focus();
    windowPrt!.print();
    windowPrt!.close();
/*
    const data = document.getElementById('htmlData')!;
    html2canvas(data).then(canvas => {
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const heightLeft = imgHeight;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      // Open the print dialog
      pdf.save('html-to-pdf.pdf');
      window.open(pdf.output('bloburl'), '_blank');
      window.print();
    });*/
  }
}
