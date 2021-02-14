import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressEditorModule } from '@shared/address-editor/address-editor.module';
import { AddressesEditorComponent } from './addresses-editor.component';



@NgModule({
  declarations: [
    AddressesEditorComponent
  ],
  exports: [
    AddressesEditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AddressEditorModule
  ]
})
export class AddressesEditorModule { }
