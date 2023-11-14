import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[statusIndicator]',
})
export class StatusIndicatorDirective implements OnInit {
  @Input() statusIndicator: boolean | undefined;

  constructor(private el: ElementRef) { }
  
  ngOnInit(){
    // definisce testo in base al boolean passato
    const statusText = this.statusIndicator ? 'ONLINE' : 'OFFLINE';
  
    // definisce proprietà colore in base al boolean passato
    const color = this.statusIndicator ? 'green' : 'red';
  
    // assegna il testo ed il colore all'elemento
    this.el.nativeElement.innerText = statusText;
    this.el.nativeElement.style.color = color;
  }
}
