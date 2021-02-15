import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

enum AddressType {
  Home = "Home",
  Business = "Business"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  addresses: FormArray = new FormArray([]);

  ngOnInit() {
    
    const lookup = {
      "Home": { street: "21 Jump Street" }
    };

    this.addresses = Object.keys(AddressType).reduce((x,y) => {
      x.push(new FormControl(lookup[y]))
      return x;
    }, new FormArray([]))
  }
}
