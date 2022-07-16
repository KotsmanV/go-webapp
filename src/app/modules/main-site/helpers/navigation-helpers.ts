import { Router } from "@angular/router";

function navigateTo(url: string, router:Router){
    router.navigate([url]);
}

class CommonComponentFunctionality{
    constructor(private router:Router){}

    navigateTo(url: string, documentId?:string){
        this.router.navigate([`home/${url}`],{
            queryParams: {
                id: documentId
            }
        });
    }

    showDate(timestamp: any) {
        return new Date(timestamp?.seconds * 1000);
      }

      showSynopsis(text:string){
return Array.from(text).slice(0,200).join(``).concat(`...`);

        return text.split(` `).slice(0,25).join(` `).concat(`...`);
      }
}

export { navigateTo, CommonComponentFunctionality} 