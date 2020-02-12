import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YoutubeService } from '../services/youtube.service';
import { Video } from '../youtube-search/youtube-search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html' ,
  styleUrls : ['./home.component.scss']
})
export class HomeComponent {
  title = 'youtube';
  form: FormGroup;
  videos : Array<Video> = new Array();

  constructor(private _youtubeService : YoutubeService){

    this.videos = this._youtubeService.getVideosMock();
    // this._youtubeService.get().subscribe((response: Video[]) => {
    //   this.videos = response;
    // });

  }
}
