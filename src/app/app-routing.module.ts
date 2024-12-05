import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewItemComponent } from './add-new-item/add-new-item.component';
import { PracticeComponent } from './practice/practice.component';
import { DataDownloadComponent } from './data-download/data-download.component';

const routes: Routes = [
  {path:'',component:AddNewItemComponent},
  {path:'practice',component:PracticeComponent},
  {path:'download',component:DataDownloadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
