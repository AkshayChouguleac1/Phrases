import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Item } from '../add-new-item/Item';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit{
currentIndex!:number;
TypeOfItem='';
practiceList:Item[]=[];
currentElement = {currentWord: '',description: ''};
constructor(private dbService:DatabaseService) {}

ngOnInit(): void {
  this.currentIndex=0
}

showNextString() {
  this.currentIndex = this.currentIndex + 1
  if(this.currentIndex==this.practiceList.length){
    this.currentIndex=0;
  }
  this.currentElement.currentWord=(this.currentIndex)+") "+this.practiceList[this.currentIndex].ItemName;
  this.currentElement.description=this.practiceList[this.currentIndex].description;
}

changeType(event:any){
  this.practiceList=[];
  this.currentIndex=0;
  this.TypeOfItem=event.value;
  this.practiceList=this.dbService.itemList.filter(item => item.type === this.TypeOfItem)
  console.log(this.practiceList+"fas")
  if(this.practiceList.length>0){
    this.currentElement.currentWord=(this.currentIndex)+") "+this.practiceList[this.currentIndex].ItemName;
    this.currentElement.description=this.practiceList[this.currentIndex].description;
  }
  console.log(this.practiceList)
}

showPrevString() {
  this.currentIndex=this.currentIndex-1
  if(this.currentIndex<0){
    this.currentIndex=this.practiceList.length-1;
  }
  this.currentElement.currentWord=(this.currentIndex)+") "+this.practiceList[this.currentIndex].ItemName;
  this.currentElement.description=this.practiceList[this.currentIndex].description;
}

searchSentenceUseOnGoogle() {
  const searchString = `use of "${this.practiceList[this.currentIndex].ItemName}" in sentenses`;
  const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(searchString)}`;
  window.open(googleSearchURL, '_blank');
}

searchMeaningOnGoogle() {
    const searchString = `Meaning of "${this.practiceList[this.currentIndex].ItemName}" in Hindi`;
    const googleSearchURL = `https://www.google.com/search?q=${encodeURIComponent(searchString)}`;
    window.open(googleSearchURL, '_blank');
}




}

