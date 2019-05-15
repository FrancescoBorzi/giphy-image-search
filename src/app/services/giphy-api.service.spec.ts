import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { GiphyApiService } from './giphy-api.service';
import { GiphySearchResult } from '../types';
import { environment } from '../../environments/environment';

describe('GiphyApiService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: GiphyApiService;

  const mockData: GiphySearchResult = {
    data: [{ title: 'MockImage' }],
    pagination: null,
    meta: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(GiphyApiService);
  });

  it('get() should correctly send the http request and return the data', () => {
    const query = 'myQuery';
    const limit = 123;
    const offset = 33;

    service.get(query, offset, limit).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(
      `${environment.api.url}?api_key=${environment.api.key}&q=${query}&limit=${limit}&offset=${offset}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockData);
    httpTestingController.verify();
  });

  it('get() should correctly send the http request with default offset and limit when not specified', () => {
    const query = 'myQuery';

    service.get(query).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(
      `${environment.api.url}?api_key=${environment.api.key}&q=${query}&limit=${environment.app.requestLimit}&offset=${0}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockData);
    httpTestingController.verify();
  });
});
