import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService{

  constructor() { }

  selectedImageUrl = new EventEmitter<string>();
}
