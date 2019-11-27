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

	opciones: any;
	constructor( public authService: AuthService ) { }

	ngOnInit() {
		// TODO: Elegir opciones a mostrar segun el rol del usuario
		if(this.authService.isAlumno()){
			console.log('Entro Alumno');
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
			
		} else if(this.authService.isProfesor()){
			console.log('Entro Profesor');
			this.opciones = [
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
		} else if(this.authService.isAdmin()) {
			this.opciones = [
				{
					nombre: 'Ticket',
					icono: 'hammer',
					link: ['/alumno/tickets']
				}
			];
		}
	}
	
}
