import { Component, Input, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'read-more',
  templateUrl: 'read-more.html'
})
export class ReadMoreComponent implements OnChanges {

  @Input() text      : string;
  @Input() maxLength : number = 200;

  currentText : string;
  hideToggle  : boolean = true;
  isCollapsed : boolean = true;
  
  constructor( private elementRef: ElementRef) {}

  toggleView() {
    this.isCollapsed = !this.isCollapsed;
    this.determineView();
  }

  determineView() {
    if (!this.text)
      return;

    if (this.text.length <= this.maxLength) {
      this.currentText = this.text;
      this.isCollapsed = false;
      this.hideToggle = true;
      console.log(555);
      return;
    }
    this.hideToggle = false;
    this.currentText = (this.isCollapsed) ? this.text.substring(0, this.maxLength) + "..." : this.text;
  }

  ngOnChanges() {
    this.determineView();       
  }
}
