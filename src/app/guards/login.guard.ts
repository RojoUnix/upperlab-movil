import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROLES } from '../config/config';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {
	
	
	constructor( private auth: AuthService, private router: Router ) { }
	
	 canActivate(): Promise<boolean> {
		
	
		return new Promise( (resolve, reject) => {
			this.auth.afAuth.auth.onAuthStateChanged( user => {
				if ( !user ) {
					// No esta identificado, puede pasar al login
					console.log('%c LoginGuard -> NO está Autenticado', 'color: green');
					return resolve(true);
				}
				// Ya se encuentra identificado
				console.log('%c LoginGuard -> Está Autenticado', 'color: blue');
				this.router.navigate(['/asistencia']);
				return resolve(false);
			});
		});
		
		// return this.auth.estaAutenticado();
		
	}
	
}
