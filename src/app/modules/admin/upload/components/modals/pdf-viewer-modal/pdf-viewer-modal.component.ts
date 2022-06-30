import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-pdf-viewer-modal',
  templateUrl: './pdf-viewer-modal.component.html',
  styleUrls: ['./pdf-viewer-modal.component.css']
})
export class PdfViewerModalComponent implements OnInit {

  constructor(private dialogRef: NbDialogRef<PdfViewerModalComponent>) { }

  @Input() pdfUrl!:string;

  ngOnInit(): void {
  }

  closeModal(){
    this.dialogRef.close()
  }

}
