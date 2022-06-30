import { Router } from "@angular/router";

function navigateTo(url: string, router:Router){
    router.navigate([url]);
}

export { navigateTo} 