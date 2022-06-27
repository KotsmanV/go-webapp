import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { StatusMessage } from '../models/enums';
import { FileViewModalComponent } from '../modules/admin/upload/components/file-view-modal/file-view-modal.component';
import { InfoMessageModalComponent } from '../modules/admin/upload/components/modals/info-message-modal/info-message-modal.component';

interface ModalDataObject {
  name: string,
  data: any
}

interface LooseObject {
  [key: string]: any
}
@Injectable({
  providedIn: 'root'
})

export class ModalHelper {

  constructor() { }
  // openFileDisplayModal(event:any, component: ...modalDataValues:ModalDataObject[]){
  //   event.preventDefault();
  //   this.dialogService.open(FileViewModalComponent,{
  //     context: ()=>{
  //       let dataObj:LooseObject = {};
  //       for (const item of modalDataValues) {
  //         dataObj[item.name] = item.data;
  //       }
  //       return dataObj;
  //     }
  //   })
  // }

  // openFileDisplayModal(event: any, inputUrls: string[]) {
  //   event.preventDefault();
  //   this.dialogService.open(FileViewModalComponent, {
  //     context: {
  //       urls: inputUrls
  //     }
  //   })
  // }

  openMessageModal(dialogServiceRef: NbDialogService, messageInput: string | StatusMessage){
    dialogServiceRef.open(InfoMessageModalComponent,{
      context:{
        message: messageInput
      }
    });
  }
}
