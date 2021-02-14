import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddressEditorModule } from '@shared/address-editor/address-editor.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressesEditorModule } from '@shared/addresses-editor/addresses-editor.module';

@NgModule({
  declarations: [
    AppComponent   
  ],
  imports: [
    AddressEditorModule,
    AddressesEditorModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
