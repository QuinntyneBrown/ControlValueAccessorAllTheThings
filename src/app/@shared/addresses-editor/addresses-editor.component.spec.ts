import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesEditorComponent } from './addresses-editor.component';

describe('AddressesEditorComponent', () => {
  let component: AddressesEditorComponent;
  let fixture: ComponentFixture<AddressesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
