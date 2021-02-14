import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressEditorComponent } from './address-editor.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddressEditorComponent],
  exports: [AddressEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AddressEditorModule { }
