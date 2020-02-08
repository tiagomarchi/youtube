import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class YoutubeService {

    api = "https://localhost:44365/api/values/";
    constructor(private http: HttpClient)
    { 
        
    }

    getSearch(search: string) {
        return this.http.get(this.api + 'search/' + search);
    }
}