import { Router } from "@angular/router";
import { DocumentTypes } from "src/app/models/database-models";
import { DataStorageService } from "src/app/services/data-storage.service";
import { FirebaseService } from "src/app/services/firebase.service";

function navigateTo(url: string, router:Router){
    router.navigate([url]);
}

class CommonComponentFunctionality{
    constructor(private router:Router, protected dataStorage?:DataStorageService){}

    navigateTo(url: string, documentId?:string){
        if(documentId && this.dataStorage){
            this.dataStorage.documentId = documentId;
        }
        this.router.navigate([`home/${url}`],{
            queryParams: {
                id: documentId
            }
        });
    }

    showDate(timestamp: any) {
        return new Date(timestamp?.seconds * 1000);
      }

    showSynopsis(text:string, length:number){
        if(text){
            return Array.from(text).slice(0,length).join(``).concat(`...`);
        }
        return ``;
    }

    renderTextAsHTML(text:string, elementRef:HTMLElement){
        elementRef.innerHTML = text;
    }
}

export { navigateTo, CommonComponentFunctionality} 