import { Component } from '@angular/core';
import { YoutubeService } from './services/youtube.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'youtube';
  customer : any;
  form: FormGroup;
  items : Array<any> = new Array();
  isLoading : boolean = false;

  constructor(private _youtubeService : YoutubeService,private _formBuilder: FormBuilder){

    this.form = this._formBuilder.group({
      search:  ['', Validators.required],
    })

    this._youtubeService.getSearch('wsl').subscribe((response: any) => {
      this.items = response;
    });

  }
  displayCustomerFn(customer: any) {
    if (customer){ this.customer = customer; return customer.name; }
  }

}
