import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YoutubeService } from '../services/youtube.service';
import 'rxjs/add/operator/debounceTime';
import { debounceTime, finalize, switchMap, tap, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html'
})
export class YoutubeSearchComponent implements OnInit {


  title = 'youtube';
  public video: Video;
  public videos: Array<Video> = new Array<Video>();
  // public mocks: Array<Video> = new Array();
  form: FormGroup;
  public items: Array<Video> = new Array();
  public isLoading: boolean = false;

  constructor(private _youtubeService: YoutubeService,
    private _formBuilder: FormBuilder) {


    this.form = this._formBuilder.group({
      search: ['', Validators.required],
    })

    // this.mocks = this._youtubeService.getVideosMock();

    this.form.get('search').valueChanges.pipe(debounceTime(500), tap(() =>
      this.isLoading = true), switchMap(value =>
        this._youtubeService.getSearch(value).pipe(finalize(() =>
          this.isLoading = false)))).subscribe((response: Video[]) =>
            this.items = response);

  }

  ngOnInit(): void {
  }

  displayItemFn(item: Video) {
    if (item) {
      return item.titulo;
    }
  }
  Add(video: Video) {
    debugger
    this.videos.push(video);
  }

}
export class Video {
  id: string;
  tipo: string;
  criado: string;
  descricao: string;
  foto: string;
  titulo: string;
}