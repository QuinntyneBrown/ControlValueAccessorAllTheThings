import { Component, ElementRef, forwardRef, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class AddressEditorComponent implements ControlValueAccessor,  Validator, OnDestroy  {

  private readonly _destroyed$: Subject<void> = new Subject();

  validate(control: AbstractControl): ValidationErrors {
    if(this.form.valid)
      return null;

    return Object.keys(this.form.controls).reduce((x,y) => { 

      const errors = {...x};

      const controlErrors = this.form.controls[y].errors;

      if (controlErrors) {
        errors[y] = controlErrors;
      }
      
      return errors;

    }, { })      
  }
  
  public form = new FormGroup({
    street: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    province: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null, [Validators.required]),
  });

  constructor(private _elementRef: ElementRef) { }
  
  writeValue(address: any): void {  
    if(address) {
      this.form.patchValue(address);
    }
  }

  registerOnChange(fn: any): void {    
    this.form.valueChanges
    .pipe(
      takeUntil(this._destroyed$)
    )
    .subscribe(fn);
  }
  
  registerOnTouched(fn: any): void {  
    this._elementRef.nativeElement.querySelectorAll("input").forEach(
      (element: HTMLElement) => {
        element.addEventListener("blur", fn.bind(this));
      }
    )    
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
