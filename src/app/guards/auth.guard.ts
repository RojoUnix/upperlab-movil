import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor( private auth: AuthService, private router: Router, private ngZone: NgZone, private storage: Storage ) {}

	canActivate(): Promise<boolean> {

		return new Promise( (resolve, reject) => {
			this.auth.afAuth.auth.onAuthStateChanged( user => this.ngZone.run(() => {
				if ( user ) {
					// El usuario inició sesión
					console.log('%c AuthGuard -> Está Autenticado', 'color: blue');

					this.auth.usuario = user;
	
					user.getIdTokenResult().then( idTokenResult => {
						this.storage.set('token', idTokenResult.token);

						this.auth.rol = this.auth.valorNumericoRol( idTokenResult.claims );
						console.log('%c Rol Usuario: ', 'color: orange');
						console.log(this.auth.rol);
						console.log(idTokenResult);

						const expirationTime = new Date(idTokenResult.expirationTime);
						const nowTime = new Date();
						console.log(expirationTime);
						// console.log(nowTime);

						if ( (expirationTime.getTime() - nowTime.getTime()) <= 300000) {

							// Actualiza el token en caso de que haya expirado.
							user.getIdTokenResult(true).then( idTokenResultRefreshed => {
								this.storage.set('token', idTokenResultRefreshed.token);
								console.log('%c ¡Se actualizó el token!', 'color: blue');
							}).catch( err => {
								console.error('¡Error al actualizar token!: ', err);
							});
						}
						
						return resolve(true);
					});
				} else {
					console.log('%c AuthGuard -> NO está Autenticado', 'color: green');
					this.router.navigate(['/login']);
					return resolve(false);
				}
			}));
		});

		// return this.auth.estaAutenticado();

	}

}
