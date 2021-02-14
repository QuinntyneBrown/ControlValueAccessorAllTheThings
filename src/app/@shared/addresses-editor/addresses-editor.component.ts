import { Component, forwardRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { map, switchMap } from 'rxjs/operators';
import { empty, of } from 'rxjs';
// https://github.com/angular/angular/blob/a6971ba89adc253bfa4260036ee4a1e0bd76159f/packages/forms/src/directives/checkbox_value_accessor.ts

@Component({
  selector: 'app-addresses-editor',
  templateUrl: './addresses-editor.component.html',
  styleUrls: ['./addresses-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressesEditorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressesEditorComponent),
      multi: true
    }       
  ]
})
export class AddressesEditorComponent implements ControlValueAccessor,  Validator  {
  validate(control: AbstractControl): ValidationErrors {
    const error = { validate: true };
      
    if (!control.value && !control.pristine) {
      return error;
    }
    
    return null as any;
  }
  
  public form;

  public _originalValue: any[];
  
  writeValue(obj: any): void {   
    if(obj && Array.isArray(obj)) {

      const i = 0;

      this.form = obj.reduce((x: FormGroup, y) => {
        x.addControl(`ctrl_${i}`,new FormControl(y))
      }, new FormGroup({ }));

      this._originalValue = this.form.value;
    }
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges
    .pipe(
      switchMap(x => {
        if(x && !_.isEqual(this._originalValue, x)) {
          return of(x);
        }
        return empty();
      }),
      map(x => {
        return Object.keys(this.form.value).map(x => this.form.value[x])
      })
    )
    .subscribe(fn);

    // subscribe to sub controls?
  }
  
  registerOnTouched(fn: any): void {
    // if any of the controls are touched the touch
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
