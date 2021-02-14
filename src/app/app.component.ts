import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public addresses: FormControl = new FormControl([
  //   {street: "21 Jump Street"},
  //   {street: "29 Queen Street West"},
  //   null
  // ]);

  addresses: FormArray = new FormArray([
    new FormControl({street: "21 Jump Street"})
  ])


  ngOnInit() {

  }
}
