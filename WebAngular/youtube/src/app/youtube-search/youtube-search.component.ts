import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YoutubeService } from '../services/youtube.service';
import 'rxjs/add/operator/debounceTime';
import { debounceTime, finalize, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html' 
})
export class YoutubeSearchComponent {
  title = 'youtube';
  customer : any;
  form: FormGroup;
  items : any;
  isLoading : boolean = false;

  constructor(private _youtubeService : YoutubeService,
    private _formBuilder: FormBuilder){

    this.form = this._formBuilder.group({
      search:  ['', Validators.required],
    })

    this.form.get('search').valueChanges.pipe(debounceTime(300),tap(() => this.isLoading = true),switchMap(value => this._youtubeService.getSearch(value).pipe(finalize(() => this.isLoading = false),))).subscribe(response => this.items = response);


  }
  displayItemFn(customer: any) {
    if (customer){ this.customer = customer; return customer.name; }
  }

}
