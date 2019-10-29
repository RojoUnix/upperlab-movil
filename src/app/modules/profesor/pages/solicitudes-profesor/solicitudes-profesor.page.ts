import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { SolicitudesService } from '../../../../services/solicitudes.service';
import { SolicitudModel } from '../../../../models/solicitud.model';
import { AlertService } from '../../../../services/alert.service';

@Component({
	selector: 'app-solicitudes-profesor',
	templateUrl: './solicitudes-profesor.page.html',
	styleUrls: ['./solicitudes-profesor.page.scss'],
})
export class SolicitudesProfesorPage implements OnInit {
	
	matricula: string;
	usuarioRol: number;
	solicitudes: SolicitudModel[];

	constructor( public authService: AuthService, private solicitudesService: SolicitudesService, private alertService: AlertService) { }
	
	ngOnInit() {
		this.matricula = this.authService.usuario.email.split('@')[0].toUpperCase();

		this.consultarSolicitudes();
	}
	
	consultarSolicitudes(){
		console.log('Consultando solicitudes de', this.matricula);
		this.solicitudesService.getSolicitudesPorMatricula( this.matricula ).subscribe( respuesta => {
			if(respuesta.status === 200){
			this.solicitudes = respuesta.solicitudes || [];
			}
		}, err => {
			this.alertService.mostrarError('Error', err.error.message);
		});
	}
}
