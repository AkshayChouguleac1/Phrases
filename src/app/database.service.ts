import {inject, Injectable } from '@angular/core';
import { Item } from './add-new-item/Item';
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { addDoc,collection,collectionData,getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  firestore:Firestore = inject(Firestore);
  itemList:Item[]=[];
  constructor() {
    this.getAllDocs();
  }

  async getAllDocs(){
    const ItemStoredInBrowser = this.getHoldingsFromLocalStorage();
    if(ItemStoredInBrowser.length>0){
      this.itemList=ItemStoredInBrowser;
      console.log('found in localstorage'+ItemStoredInBrowser.length)
    }else{
      this.itemList=[];
      //adding few values initially it is required because without these values it won't work properly
      this.itemList.push(new Item('Phrase','To come in handy','I’m so glad that I studied Spanish - it really came in handy when I visited Mexico'))
      this.itemList.push(new Item('Vocabulary','Recognize',"-To identify or acknowledge something or someone. -I didnt recognize her at first because she had changed her hairstyle."))
      this.itemList.push(new Item('Sentence','That’s not how I see it.',"That's not how I see it. I believe houses are built to protect us."))

      const querySnapshot =await getDocs(collection(this.firestore, "Items")); 
      querySnapshot.forEach((doc) => {
        this.itemList.push(new Item(doc.data()['type'],doc.data()['ItemName'],doc.data()['description']));
        console.log(doc.id, " => ", doc.data());
      });
      localStorage.setItem('Items', JSON.stringify(this.itemList))
      console.log("db call happend")
    }
  }
  
  private getHoldingsFromLocalStorage(): any[] {
    const storedItems = localStorage.getItem('Items');
    return storedItems ? JSON.parse(storedItems) : [];
  }

  save(item:Item){
    const itemCollection = collection(this.firestore,"Items")
    addDoc(itemCollection,{type:item.type,ItemName:item.ItemName,description:item.description});
    this.itemList.push(item);
    localStorage.setItem('Items', JSON.stringify(this.itemList))
    console.log(this.itemList);
  }

}
