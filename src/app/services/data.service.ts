import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROLES } from '../config/config';
import { MenuOption } from '../shared/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	
	constructor( private http: HttpClient ) { }

	/**
	 * Regresa las opciones que irán en el menú dependiendo del tipo de usuario.
	 * 
	 * @param tipoUsuario El tipo de usuario: Alumno, Profesor, Admin, Superadmin
	 */
	getMenu( tipoUsuario: number ): Observable<MenuOption[]> {
		switch (tipoUsuario) {
			case ROLES.ALUMNO:
				return this.http.get<MenuOption[]>('/assets/data/alumnoMenu.json');
			case ROLES.PROFESOR:
				return this.http.get<MenuOption[]>('/assets/data/profesorMenu.json');
			case ROLES.ADMINISTRADOR:
				return this.http.get<MenuOption[]>('/assets/data/adminMenu.json');
			case ROLES.SUPERADMINISTRADOR:
				return this.http.get<MenuOption[]>('/assets/data/adminMenu.json');
		}
	}
}
