import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBlockButton]',
  //standalone: true
})
export class BlockButtonDirective {

  @Input() set appBlockButton(isLoading: boolean) {
    if (isLoading) {
      this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
      this.renderer.addClass(this.el.nativeElement, 'loading');
    } else {
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
      this.renderer.removeClass(this.el.nativeElement, 'loading');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  preventMultipleClicks() {
    this.renderer.setAttribute(this.el.nativeElement, 'disabled', 'true');
    setTimeout(() => {
      this.renderer.removeAttribute(this.el.nativeElement, 'disabled');
    }, 3000); 
  }

  

}
