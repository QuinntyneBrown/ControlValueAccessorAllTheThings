import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public address: FormControl = new FormControl("");

  ngOnInit() {
    this.address.patchValue({ name: "!"});
  }
}
