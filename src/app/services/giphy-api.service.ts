import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GiphySearchResult } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyApiService {
  private readonly URL = environment.api.url;
  private readonly params = new HttpParams().set('api_key', environment.api.key);

  constructor(private http: HttpClient) { }

  get(query: string, offset: number = 0, limit: number = environment.app.requestLimit): Observable<GiphySearchResult> {
    return this.http.get<GiphySearchResult>(this.URL, {
      params: this.params.set('q', query).set('limit', `${limit}`).set('offset', `${offset}`),
    });
  }
}
