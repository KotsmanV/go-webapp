import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-char-counter',
  templateUrl: './char-counter.component.html',
  styleUrls: ['./char-counter.component.css']
})
export class CharCounterComponent implements OnInit {

  @Input() textareaElement!: HTMLTextAreaElement;
  @Input() characterCount:number = 200;

  constructor() { }

  ngOnInit(): void {
  }

  countCharacters() {
    return this.textareaElement.value.length;
  }
}
