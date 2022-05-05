import { Component, Input, OnInit } from '@angular/core';
import { NbDialogConfig, NbDialogRef } from '@nebular/theme';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-file-view-modal',
  templateUrl: './file-view-modal.component.html',
  styleUrls: ['./file-view-modal.component.css']
})
export class FileViewModalComponent implements OnInit {

  constructor(private modalService:ModalService,
              private dialogRef: NbDialogRef<FileViewModalComponent>
    ) { }

  @Input() urls!:string[];

  ngOnInit(): void {
  }

  selectImage(event:any){
    this.modalService.selectedImageUrl.next(event.target.src);
    this.dialogRef.close();
  }

}
