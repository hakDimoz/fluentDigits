import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, output } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appClickedOutside]',
  standalone: true,
})
export class ClickedOutsideDirective {
  clickOutside = output();
  documentClickSubscription: Subscription | undefined;

  constructor(
    private element: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnDestroy(): void {
    this.documentClickSubscription?.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.documentClickSubscription = fromEvent(this.document, 'click')
      .pipe(
        filter((event) => {
          return !this.isInside(event.target as HTMLElement);
        })
      )
      .subscribe(() => {
        this.clickOutside.emit();
      });
  }

  isInside(elementToCheck: HTMLElement): boolean {
    return (
      elementToCheck === this.element.nativeElement ||
      this.element.nativeElement.contains(elementToCheck)
    );
  }
}
