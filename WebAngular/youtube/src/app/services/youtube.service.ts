import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Video } from '../youtube-search/youtube-search.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class YoutubeService {

    api = "https://localhost:44365/api/values/";
    constructor(private http: HttpClient)
    { 
        
    }
    getVideosMock(): any[] {
		return videos;
    }
    get<T>(): Observable<any> {
        return this.http.get<any>(this.api).pipe<T>(map(resp => resp.data));
      }
    getSearch(search: string) {
        return this.http.get(this.api + 'search/' + search);
    }
}

let videos: Video[] = [
    {
        "id": "1",
        "tipo" : "'video",
        "criado": "2020-02-10T10:27:15.764Z",
        "descricao": "Mr. Kaci Stehr",
        "foto": "http://lorempixel.com/640/480/technics",
        "titulo": "Randy Ziemann Jr."
    },
    {
        "id": "2",
        "tipo" : "'video",
        "criado": "2020-02-11T00:01:26.315Z",
        "descricao": "Ivah Hand",
        "foto": "http://lorempixel.com/640/480/business",
        "titulo": "Katheryn Runolfsson"
    },
    {
        "id": "3",
        "tipo" : "'video",
        "criado": "2020-02-10T15:17:38.622Z",
        "descricao": "Abelardo Block",
        "foto": "http://lorempixel.com/640/480/animals",
        "titulo": "Marc Bernhard"
    }

  
]