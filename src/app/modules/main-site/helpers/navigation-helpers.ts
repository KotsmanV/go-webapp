import { Router } from "@angular/router";

function navigateTo(url: string, router:Router){
    router.navigate([url]);
}

class CommonComponentFunctionality{
    constructor(private router:Router){}

    navigateTo(url: string){
        this.router.navigate([url]);
    }

    showDate(timestamp: any) {
        return new Date(timestamp?.seconds * 1000);
      }
}

export { navigateTo, CommonComponentFunctionality} 