import { ComponentFixture } from '@angular/core/testing';

export abstract class PageObject<ComponentType> {

  constructor(protected fixture: ComponentFixture<ComponentType>) {}

  protected query<T extends HTMLElement>(selector: string, assert = true): T {
    const element: T = this.fixture.nativeElement.querySelector(selector);

    if (assert) {
      expect(element).toBeTruthy(`Element with selector ${selector} not found`);
    }

    return element;
  }

  protected queryAll<T extends HTMLElement>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}
