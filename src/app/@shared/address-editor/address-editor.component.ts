import { Component, ElementRef, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-editor',
  templateUrl: './address-editor.component.html',
  styleUrls: ['./address-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressEditorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressEditorComponent),
      multi: true
    }       
  ]
})
export class AddressEditorComponent implements ControlValueAccessor,  Validator  {
  validate(control: AbstractControl): ValidationErrors {
    const error = { validate: true };
      
    if (!control.value && !control.pristine) {
      return error;
    }
    
    return null as any;
  }
  
  public form = new FormGroup({
    street: new FormControl(null, [Validators.required]),
  });

  constructor(private _elementRef: ElementRef) {
    
  }
  
  writeValue(obj: any): void {  
    if(obj) {
      this.form.patchValue(obj);
    }
  }

  registerOnChange(fn: any): void {    
    this.form.valueChanges
    .subscribe(fn);
  }
  
  registerOnTouched(fn: any): void {  
    (this._elementRef.nativeElement as HTMLElement).querySelectorAll("input").forEach(
      x => {
        x.addEventListener("blur", fn.bind(this));
      }
    )    
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
