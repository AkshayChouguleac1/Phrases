import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Item } from './Item';
@Component({
  selector: 'app-add-new-item',
  templateUrl: './add-new-item.component.html',
  styleUrls: ['./add-new-item.component.css']
})
export class AddNewItemComponent implements OnInit{
  addNewForm!:FormGroup;
  constructor(private dbService:DatabaseService,private toastr: ToastrService,private router:Router) {}
  ngOnInit(): void {
    console.log(this.dbService.itemList)
    this.addNewForm = new FormGroup({
      'type':new FormControl('',Validators.required),
      'itemName':new FormControl('',Validators.required),
      'description':new FormControl('',Validators.required)
    })
  }

  saveForm(){
    if(this.addNewForm.valid){
      const item = new Item(
        this.addNewForm.get('type')?.value,
        this.addNewForm.get('itemName')?.value,
        this.addNewForm.get('description')?.value
      );
      this.dbService.save(item)
      this.toastr.success('', 'Added!');
      this.router.navigateByUrl('/practice')
    }else{
      this.toastr.error('', 'Please fill all the required fields');
    }

  }
}
