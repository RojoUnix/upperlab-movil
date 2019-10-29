import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ROLES } from '../../config/config';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
	usuario: number;

	esAlumno: boolean;
	esAdmin: boolean;
	esProfesor: boolean;

	opciones: any;
	constructor( public authService: AuthService ) { }

	ngOnInit() {
		// TODO: Elegir opciones a mostrar segun el rol del usuario
		if(this.authService.rol == ROLES.ALUMNO){
			console.log('Entro Alumno');
			this.esAlumno= true;
			this.opciones = [
				{
					nombre: 'Asistencia',
					icono: 'hammer',
					link: ['/alumno/asistencia']
				},
				{
					nombre: 'Ticket',
					icono: 'hammer',
					link: ['/alumno/tickets']
				},
				{
					nombre: 'Solicitud de laboratorios',
					icono: 'hammer',
					link: ['/alumno/solicitud']
				}
			];
			
		} else if(this.authService.rol == ROLES.PROFESOR){
			console.log('Entro Profesor');
			this.esProfesor = true;
			this.opciones = [
				{
					nombre: 'Asistencia',
					icono: 'hammer',
					link: ['/alumno/asistencia']
				},
				{
					nombre: 'Ticket',
					icono: 'hammer',
					link: ['/alumno/tickets']
				},
				{
					nombre: 'Solicitud de laboratorios',
					icono: 'hammer',
					link: ['/alumno/solicitud']
				}
			];
		}else if(this.authService.rol == ROLES.ADMINISTRADOR){
			this.esAdmin = true;
			this.opciones = [
				{
					nombre: 'Asistencia',
					icono: 'hammer',
					link: ['/alumno/asistencia']
				},
				{
					nombre: 'Ticket',
					icono: 'hammer',
					link: ['/alumno/tickets']
				}
			];
		}
	}
	
}
