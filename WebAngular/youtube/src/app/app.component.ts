import { Component } from '@angular/core';
import { YoutubeService } from './services/youtube.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'youtube';
  items : Array<any> = new Array();
  constructor(private _youtubeService : YoutubeService){

    this._youtubeService.getSearch('wsl').subscribe((response: any) => {
      this.items = response;
    });

  }

}
