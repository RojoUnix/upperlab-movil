import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../authentication/auth.service';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {
	
	
	constructor( private auth: AuthService, private router: Router, private ngZone: NgZone ) { }
	
	 canActivate(): Promise<boolean> {
		
	
		return new Promise( (resolve, reject) => {
			this.auth.afAuth.auth.onAuthStateChanged( user => this.ngZone.run(() => {
				if ( !user ) {
					// No esta identificado, puede pasar al login
					console.log('%c LoginGuard -> NO está Autenticado', 'color: green');
					return resolve(true);
				}
				// Ya se encuentra identificado
				console.log('%c LoginGuard -> Está Autenticado', 'color: blue');
				this.router.navigate(['/admin/dashboard']);
				return resolve(false);
			}));
		});
		
		// return this.auth.estaAutenticado();
		
	}
	
}
