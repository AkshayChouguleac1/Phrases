import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatabaseService } from '../database.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-data-download',
  templateUrl: './data-download.component.html',
  styleUrls: ['./data-download.component.css']
})
export class DataDownloadComponent {
  typeOfelements:string=''
  isCategoryNotSelected=true;
  constructor(private dbService:DatabaseService,private toastr: ToastrService){}

  changeType(event:any){
    this.isCategoryNotSelected=false
    this.typeOfelements=event.value
  }

  generatePDF(){
    // Create a new PDF document.
		const doc = new jsPDF();

		// Add content to the PDF.
		doc.setFontSize(16);
		doc.text("Akshay's PDF", 10, 10);
		doc.setFontSize(12);
		doc.text(
			"Here's the "+this.typeOfelements+' list that you asked for',
			10,
			20,
		);

		// Create a table using `jspdf-autotable`.
		const headers = [['Item', 'Desciption']];
    const seperatedItems=this.dbService.itemList.filter(item => item.type === this.typeOfelements)
		const data = seperatedItems.map(item => [item.ItemName, item.description]);
		autoTable(doc, {
			head: headers,
			body: data,
			startY: 30, // Adjust the `startY` position as needed.
		});

		// Save the PDF.
		doc.save('Practice.pdf');
  }

  download(){
    if(this.isCategoryNotSelected){
      this.toastr.warning('', 'Select a category first.');
    }else{
      this.generatePDF()
    }
  
   }

 }

 
    


