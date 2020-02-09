import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html' 
})
export class HomeComponent {
  title = 'youtube';
  customer : any;
  form: FormGroup;
  items : Array<any> = new Array();
  isLoading : boolean = false;

  constructor(private _youtubeService : YoutubeService,
    private _formBuilder: FormBuilder){

    this.form = this._formBuilder.group({
      search:  ['', Validators.required],
    })

    this._youtubeService.getSearch('wsl').subscribe((response: any) => {
      this.items = response;
    });

  }
  displayItemFn(customer: any) {
    if (customer){ this.customer = customer; return customer.name; }
  }

}
