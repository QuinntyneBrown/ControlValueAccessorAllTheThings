import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AddressEditorModule } from '@shared/address-editor/address-editor.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '@shared/input/input.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AddressEditorModule,
    InputModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
