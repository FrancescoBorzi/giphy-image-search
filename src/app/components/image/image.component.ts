import { Component, Input } from '@angular/core';

import { GiphyGifObject } from '../../types';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  loaded = false;
  @Input() giphyGifObject: GiphyGifObject;
}
