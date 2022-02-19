import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropDown]',
})
export class DropDownDirective implements OnInit {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggle() {
    this.isOpen = !this.isOpen;
  }
  ngOnInit(): void {}
}
