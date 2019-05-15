import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { of, Subscription, throwError } from 'rxjs';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { AppComponent } from './app.component';
import { ImageComponent } from './image/image.component';
import { PageObject } from '../test-utils/page-object';
import { GiphyApiService } from '../services/giphy-api.service';
import { GiphyGifObject, GiphySearchResult } from '../types';
import { DebugInfoComponent } from './debug-info/debug-info.component';

class AppPage extends PageObject<AppComponent> {
  get searchInput() { return this.query<HTMLInputElement>('.image-search-input') }
  get imagesListWrapper() { return this.query<HTMLInputElement>('#image-list-wrapper') }
  get debugInfo() { return this.query<HTMLElement>('app-debug-info', false); }
  get errorWrapper() { return this.query<HTMLInputElement>('#error-wrapper', false) }
  get imageComponents() { return this.queryAll<HTMLElement>('app-image'); }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let page: AppPage;

  const mockGifObjects: GiphyGifObject[] = [
    {
      title: 'MockImage1',
      images: {
        fixed_height: {
          url: 'https://angular.io/assets/images/logos/angular/angular.png'
        }
      },
    },
    {
      title: 'MockImage2',
      images: {
        fixed_height: {
          url: 'https://themes.getbootstrap.com/wp-content/themes/bootstrap-marketplace/assets/images/elements/bootstrap-stack.png'
        }
      },
    },
    {
      title: 'MockImage3',
      images: {
        fixed_height: {
          url: 'https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png'
        }
      },
    }
  ];
  const mockGiphySearchResult: GiphySearchResult = {
    data: mockGifObjects,
    pagination: null,
    meta: null,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DebugInfoComponent,
        ImageComponent,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ScrollingModule,
        LoadingBarHttpClientModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new AppPage(fixture);
    fixture.autoDetectChanges(true);
  });

  /* Unit tests */

  it('search() should correctly update the pagination and images fields and correctly reset the scroll', () => {
    const spyApiGet = spyOn(TestBed.get(GiphyApiService), 'get').and.returnValue(of(mockGiphySearchResult));
    const spyScrollToIndex = spyOn(component.virtualScroll, 'scrollToIndex');
    const query = 'this is my query';
    component.query = query;
    component.pagination = null;
    component.images = null;

    component.search();

    expect(spyApiGet).toHaveBeenCalledWith(query);
    expect(spyScrollToIndex).toHaveBeenCalledTimes(1);
    expect(component.pagination).toEqual(mockGiphySearchResult.pagination);
    expect(component.images).toEqual(mockGiphySearchResult.data);
  });

  it('search() should flag the error field when the http request fails', () => {
    spyOn(TestBed.get(GiphyApiService), 'get').and.returnValue(throwError('something bad happened'));
    component.error = false;

    component.search();

    expect(component.error).toBe(true);
  });

  it('when destroyed, it should safely unsubscribe the subscription (if any)', () => {
    component.queryModelChangedSubscription = null;
    component.ngOnDestroy();

    component.queryModelChangedSubscription = new Subscription();
    const unsubscribeSpy = spyOn(component.queryModelChangedSubscription, 'unsubscribe');
    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
  });

  it('when typing in the search bar, the query field should be updated and the search triggered after 500 milliseconds',
    fakeAsync(() => {
      component.query = null;
      const query = 'this is my query';
      const searchSpy = spyOn(component, 'search');

      page.searchInput.value = query;
      page.searchInput.dispatchEvent(new Event('input'));
      page.searchInput.dispatchEvent(new Event('change'));
      fixture.detectChanges();
      tick(500);

      expect(searchSpy).toHaveBeenCalledTimes(1);
      expect(component.query).toEqual(query);
    })
  );

  for (const { testId, pagination, images, scrollRequestThreshold, scrollIndex, expectedCall } of [
    {
      // case 1: pagination is null (safe check)
      testId: 1,
      pagination: null,
      images: [1, 2, 3],
      scrollRequestThreshold: 80,
      scrollIndex: 90,
      expectedCall: false,
    },
    {
      // case 2: the scroll hasn't reached the threshold
      testId: 2,
      pagination: { total_count: 0, count: 0, offset: 0 },
      images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      scrollRequestThreshold: 80,
      scrollIndex: 7,
      expectedCall: false,
    },
    {
      // case 3: the scroll has reached the threshold, but the total_count is not bigger than the count
      testId: 3,
      pagination: { total_count: 3, count: 3, offset: 0 },
      images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      scrollRequestThreshold: 80,
      scrollIndex: 8,
      expectedCall: false,
    },
    {
      // case 4: the scroll has reached the threshold, the total_count is bigger than the count, but the offset is max
      testId: 4,
      pagination: { total_count: 4, count: 3, offset: 4 },
      images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      scrollRequestThreshold: 80,
      scrollIndex: 8,
      expectedCall: false,
    },
    {
      // case5: all conditions satisfy the call requirements
      testId: 5,
      pagination: { total_count: 4, count: 3, offset: 2 },
      images: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      scrollRequestThreshold: 80,
      scrollIndex: 8,
      expectedCall: true,
    },
  ]) {
    it(`onScrollIndexChanged() should call loadMoreItems() only under certain conditions [${testId}]`, () => {
      component.pagination = pagination;
      component.images = images as GiphyGifObject[];
      component.scrollRequestThreshold = scrollRequestThreshold;
      const loadMoreItemsSpy = spyOn(component, 'loadMoreItems');

      component.onScrollIndexChanged(scrollIndex);

      expect(loadMoreItemsSpy).toHaveBeenCalledTimes(expectedCall ? 1 : 0);
    });
  }

  describe('loadMoreItems()', () => {
    beforeEach(() => {
      component.images = [];
    });

    it('should correctly update the pagination and images fields without resetting the scroll', () => {
      const spyApiGet = spyOn(TestBed.get(GiphyApiService), 'get').and.returnValue(of(mockGiphySearchResult));
      const spyScrollToIndex = spyOn(component.virtualScroll, 'scrollToIndex');
      const query = 'this is my query';
      component.query = query;
      component.pagination = null;

      component.loadMoreItems();

      expect(spyApiGet).toHaveBeenCalledWith(query, 0);
      expect(spyScrollToIndex).toHaveBeenCalledTimes(0);
      expect(component.pagination).toEqual(mockGiphySearchResult.pagination);
      expect(component.images).toEqual(mockGiphySearchResult.data);
    });

    it('should flag the error field when the http request fails', () => {
      spyOn(TestBed.get(GiphyApiService), 'get').and.returnValue(throwError('something bad happened'));
      component.error = false;

      component.loadMoreItems();

      expect(component.error).toBe(true);
    });

    it('if there is already a subscription, it should unsubscribe it before creating another subscription', () => {
      component.loadMoreItemsSubscription = new Subscription();
      const unsubscribeSpy = spyOn(component.loadMoreItemsSubscription, 'unsubscribe');

      component.loadMoreItems();

      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });
  });

  /* DOM Component tests */
  it('the DOM should correctly reflect the contents of the results', fakeAsync(() => {
    component.images = mockGifObjects;
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(page.imageComponents).toBeTruthy();
      expect(page.imageComponents.length).toEqual(mockGifObjects.length);
      expect(component.virtualScroll.getDataLength()).toEqual(mockGifObjects.length);
      expect(page.imagesListWrapper.innerHTML).toContain(mockGifObjects[0].images.fixed_height.url);
      expect(page.imagesListWrapper.innerHTML).toContain(mockGifObjects[1].images.fixed_height.url);
      expect(page.imagesListWrapper.innerHTML).toContain(mockGifObjects[2].images.fixed_height.url);
    });
  }));

  for (const error of [true, false]) {
    it(`the error message should be ${error ? 'shown' : 'hidden' } when the error field is ${error}`, () => {
      component.error = error;
      fixture.detectChanges();

      if (error) {
        expect(page.errorWrapper).toBeTruthy()
      } else {
        expect(page.errorWrapper).toBeFalsy()
      }
    });
  }

  for (const setting of [true, false]) {
    it(`the debug info should be ${setting ? 'shown' : 'hidden' } when the setting field is ${setting}`, () => {
      component.showDebugInfo = setting;
      fixture.detectChanges();

      if (setting) {
        expect(page.debugInfo).toBeTruthy()
      } else {
        expect(page.debugInfo).toBeFalsy()
      }
    });
  }
});
