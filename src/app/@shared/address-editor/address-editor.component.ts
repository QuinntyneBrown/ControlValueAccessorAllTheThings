import { Component, ElementRef, forwardRef, OnDestroy } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

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
    return this.form.valid 
    ? null
    : Object.keys(this.form.controls).reduce((x,y) => { 
      const errors = {...x};
      
      const controlErrors = this.form.controls[y].errors;

      if (controlErrors) {
        errors[y] = controlErrors;
      }
      
      return errors;
    }, { });      
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

    this._elementRef.nativeElement.querySelectorAll("*").forEach(
      (element: HTMLElement) => {
        fromEvent(element,"blur")
        .pipe(
          takeUntil(this._destroyed$),
          tap(x => fn())
        ).subscribe();

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
