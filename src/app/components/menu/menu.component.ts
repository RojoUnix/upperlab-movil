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
	opciones: any = [
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
	]
	constructor( public authService: AuthService ) { }

	ngOnInit() {
		// TODO: Elegir opciones a mostrar segun el rol del usuario
		if(this.authService.rol == ROLES.ALUMNO){
			console.log('Entro Alumno');
			this.esAlumno= true;
			
		} else if(this.authService.rol == ROLES.PROFESOR){
			//Consultando tickets para Alumno o Profesor
			console.log('Entro Profesor');
			this.esProfesor = true;
		}else{
			// Consultando tickets para Administrador (Todos los tickets)
			this.esAdmin = true;
			this.getTicketsAdmin();
		}
	}
	
}
