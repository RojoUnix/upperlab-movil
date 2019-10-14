import { Injectable, Injector, Type } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class AllGuard implements CanActivate {
	
	constructor(private injector: Injector) { }
	
	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
		const guards = route.data.guards || [];
		
		for (const guard of guards) {
			const instance: CanActivate = this.injector.get<any>(guard as Type<any>);
			const result                = await instance.canActivate(route, state);
			if (result === false || result instanceof UrlTree) {
				return result;
			}
		}
		return true;
	}
}
