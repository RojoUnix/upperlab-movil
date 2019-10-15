import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROLES } from '../config/config';

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
				this.router.navigate(['/alumno/asistencia']);
				return resolve(false);
			}));
		});
		
		// return this.auth.estaAutenticado();
		
	}


	/**
	 * 
				console.log('Usuario');
				console.log(user);
				
				// Ya se encuentra identificado
				console.log('%c LoginGuard -> Está Autenticado', 'color: blue');

				user.getIdTokenResult().then( token => {

					const rol = this.auth.valorNumericoRol( token.claims );
					
					this.auth.rol = rol;
					this.auth.usuario = user;

					
					if ( rol === ROLES.ADMINISTRADOR ) {
						console.log('Eres ADMINISTRADOR');
						this.router.navigate(['/admin/dashboard']);
						
						
					} else if ( rol === ROLES.ALUMNO ) {
						console.log('Eres ALUMNO');
						this.router.navigate(['/alumno/asistencia']);
						
						
					} else if ( rol === ROLES.PROFESOR ) {
						console.log('Eres PROFESOR');
						this.router.navigate(['/profesor/inicio']);
						
						
					}
					console.log('Retornando false');
					
					return resolve(false);
				}).catch(err => {
					return resolve(false);
				});
			}));
	 */
	
}
