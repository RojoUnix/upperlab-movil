import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { ROLES } from '../../config/config';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate {
	
	constructor(private authService: AuthService, private router: Router, private _location: Location ) {}
	
	canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
		
		return new Promise( (resolve, reject) => {

			let rolesPermitidos;
			
			const rol = this.authService.rol;
			
			rolesPermitidos = route.data.roles || [];
			
			if ( rolesPermitidos.includes( rol ) ) {
				console.log('%c RoleGuard -> Acceso permitido', 'color: orange');
				return resolve(true);
			} else {
				console.log('%c RoleGuard -> Acceso NO permitido', 'color: pink');
					
				if ( rol === ROLES.SUPERADMINISTRADOR || rol === ROLES.ADMINISTRADOR ) {
					console.log('%c Eres Administrador || Superadministrador', 'color: pink');
					
					if (this.router.url === '/') {
						this.router.navigate(['/admin/dashboard']);
					} else {
						Swal.fire({
							title: 'Permisos insuficientes',
							text: 'No tienes permiso para realizar esta acción',
							type: 'warning'
						});
					}
				} else if ( rol === ROLES.ALUMNO ) {
					console.log('%c Eres Alumno', 'color: pink');
					this.router.navigate(['alumno/inicio']);
				} else if ( rol === ROLES.PROFESOR ) {
					console.log('%c Eres Profesor', 'color: pink');
					this.router.navigate(['profesor/inicio']);
				}
				
				return resolve(false);
			}
		});
	}
}
