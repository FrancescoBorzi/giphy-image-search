import { Component, Input } from '@angular/core';

import { GiphyGifObject, GiphyPaginationObject } from '../../types';

@Component({
  selector: 'app-debug-info',
  templateUrl: './debug-info.component.html',
  styleUrls: ['./debug-info.component.scss']
})
export class DebugInfoComponent {
  @Input() pagination: GiphyPaginationObject;
  @Input() images: GiphyGifObject[];
}
