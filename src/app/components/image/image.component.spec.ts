import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageComponent } from './image.component';
import { PageObject } from '../../test-utils/page-object';
import { GiphyGifObject } from '../../types';

class ImagePage extends PageObject<ImageComponent> {
  get imgTitle() { return this.query<HTMLDivElement>('.img-title'); }
  get loadingImg() { return this.query<HTMLImageElement>('.img-loading'); }
  get loadedImg() { return this.query<HTMLImageElement>('.img-loaded'); }
  get imgType() { return this.query<HTMLSpanElement>('.img-type'); }
  get imgId() { return this.query<HTMLSpanElement>('.img-id'); }
  get imgUrl() { return this.query<HTMLAnchorElement>('.img-url'); }
  get imgSource() { return this.query<HTMLAnchorElement>('.img-source'); }
  get imgRating() { return this.query<HTMLSpanElement>('.img-rating'); }
  get imgCreated() { return this.query<HTMLSpanElement>('.img-created'); }
  get imgUser() { return this.query<HTMLSpanElement>('.img-user'); }

  getImgWrapper(assert = true) {
    return this.query<HTMLDivElement>('.image-component-wrapper', assert);
  }
}

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;
  let page: ImagePage;
  let mockGifObject: GiphyGifObject;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    page = new ImagePage(fixture);
    fixture.autoDetectChanges(true);

    mockGifObject = {
      type: 'my-mock-type',
      id: 'my-mock-id',
      bitly_url: 'my-mock-url',
      title: 'my-mock-title',
      username: 'my-mock-username',
      source_post_url: 'https://angular.io/',
      source_tld: 'angular.io',
      rating: 'my-mock-rating',
      import_datetime: '2019-05-17 16:00:00',
      images: {
        fixed_height: {
          url: 'https://angular.io/assets/images/logos/angular/angular.png'
        }
      },
    };
  });

  it('should not display anything if the giphyGifObject input is not there', () => {
    expect(page.getImgWrapper(false)).toBe(null);
  });

  it('should correctly display the image and its properties reflecting the giphyGifObject input', () => {
    component.giphyGifObject = mockGifObject;
    fixture.detectChanges();

    expect(page.getImgWrapper(false)).toBeTruthy();
    expect(page.imgTitle.innerHTML).toContain(mockGifObject.title);
    expect(page.imgType.innerHTML).toContain(mockGifObject.type.toUpperCase());
    expect(page.imgId.innerHTML).toContain(mockGifObject.id);
    expect(page.imgUrl.href).toContain(mockGifObject.bitly_url);
    expect(page.imgUrl.innerHTML).toContain(mockGifObject.bitly_url);
    expect(page.imgSource.href).toEqual(mockGifObject.source_post_url);
    expect(page.imgSource.innerHTML).toContain(mockGifObject.source_tld);
    expect(page.imgRating.innerHTML).toContain(mockGifObject.rating.toUpperCase());
    expect(page.imgCreated.innerHTML).toContain('17/05/2019 - 16:00');
    expect(page.imgUser.innerHTML).toContain(mockGifObject.username);
  });

  it('should correctly display the loading image when the provided image has not been loaded', () => {
    component.giphyGifObject = mockGifObject;
    component.giphyGifObject.images.fixed_height.url = ''; // this will prevent the image to load
    fixture.detectChanges();

    expect(page.loadedImg.hidden).toBe(true);
    expect(page.loadingImg.hidden).toBe(false);
  });

  it('should correctly display the provided image once loaded', () => {
    component.giphyGifObject = mockGifObject;
    component.loaded = true;
    fixture.detectChanges();

    expect(page.loadedImg.hidden).toBe(false);
    expect(page.loadingImg.hidden).toBe(true);
  });
});
