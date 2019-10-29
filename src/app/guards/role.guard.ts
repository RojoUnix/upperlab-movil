import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ROLES } from '../config/config';
import { AlertService } from '../services/alert.service';


@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate {
	
	constructor(private alertService: AlertService, private authService: AuthService, private router: Router, private _location: Location ) {}
	
	canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		console.log('Funcion canActivate...');
		
		return new Promise( (resolve, reject) => {

			let rolesPermitidos;
			
			const rol = this.authService.rol;
			
			rolesPermitidos = route.data.roles || [];
			
			if ( rolesPermitidos.includes( rol ) ) {
				console.log('%c RoleGuard -> Acceso permitido', 'color: orange');
				return resolve(true);
			} else {
				console.log('%c RoleGuard -> Acceso NO permitido', 'color: pink');
					
				// if ( rol === ROLES.SUPERADMINISTRADOR) {
				// 	console.log('%c Eres Administrador || Superadministrador', 'color: pink');
					
				// 	if (this.router.url === '/') {
				// 		this.router.navigate(['/admin/tickets']);
				// 	} else {
				// 		this.alertService.mostrarError('Permisos insuficientes','No tienes permiso para realizar esta acción');
				// 	}
				if (rol === ROLES.ADMINISTRADOR){
					console.log('%c Eres ADMINISTRADOR','color: red');
					console.log(this.router.url);
					
					this.router.navigate(['/admin/tickets']);
				} else if ( rol === ROLES.ALUMNO ) {
					console.log('%c Eres ALUMNO', 'color: pink');
					this.router.navigate(['/alumno/asistencia']);
				} else if ( rol === ROLES.PROFESOR ) {
					console.log('%c Eres PROFESOR', 'color: pink');
					this.router.navigate(['/profesor/solicitud']);
				}
				
				return resolve(false);
			}
		});
	}
}
