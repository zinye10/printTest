
import { Router, RouterOutlet } from '@angular/router';
import { jsPDF } from 'jspdf'
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'pdf-generator';
  
  imagePath = "/favicon.ico";

  constructor(private router: Router){
    
  }

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
      pdf.save('持ち出し許可証.pdf');
      //window.open(pdf.output('bloburl'), '_blank');
      window.print();
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
      <body onload="window.print();window.close()>${printContent?.outerHTML}</body>
      </html>
    `);
    windowPrt!.document.close();
    windowPrt!.focus();
    //windowPrt!.print();
    //windowPrt!.close();
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

  preview() {}

  printDialog() {
    this.router.navigate(['/print']);
  }

  exportToExcel() {
    // Sample data to be exported
    const data = [
      { Name: 'John Doe', Age: 28, Address: '123 Main St' },
      { Name: 'Jane Doe', Age: 24, Address: '456 Elm St' }
    ];

    // Convert JSON data to worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate Excel file and trigger download
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'data.xlsx');
  }
  
}