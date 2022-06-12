import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-info-message-modal',
  templateUrl: './info-message-modal.component.html',
  styleUrls: ['./info-message-modal.component.css']
})
export class InfoMessageModalComponent implements OnInit {

  constructor(private dialogRef:NbDialogRef<InfoMessageModalComponent>) { }

  @Input() message!:string;

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
