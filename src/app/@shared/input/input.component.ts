import { Component, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  host: {
    '(change)': '_onChange($event.target.value)'
  }  
})
export class InputComponent implements ControlValueAccessor {

  public value: string = null;
  
  constructor(
    private readonly _elementRef: ElementRef
  ) { }

  writeValue(obj: any): void {
    if(obj) {
      this.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {

    (this._elementRef.nativeElement as HTMLElement)
    .querySelector("input").addEventListener("blur", () => fn()); 
  }

  setDisabledState?(isDisabled: boolean): void {

  }

  public _onChange: (_: any) => void = () => {};

  public handleChange($event) {
    this._onChange($event.target.value);
  }
}