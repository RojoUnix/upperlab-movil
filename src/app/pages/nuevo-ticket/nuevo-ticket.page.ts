import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { TicketModel } from '../../models/ticket.model';
import { AuthService } from '../../services/auth.service';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';
import { AlumnoModel, AsignacionModel } from '../../models/alumno.model';
import { AlertService } from '../../services/alert.service';
import { SelectOptions } from '../../shared/interfaces/interfaces';


@Component({
	selector: 'app-nuevo-ticket',
	templateUrl: './nuevo-ticket.page.html',
	styleUrls: ['./nuevo-ticket.page.scss'],
})
export class NuevoTicketPage implements OnInit {

	public formulario: FormGroup;
	public ticket: TicketModel;

	// Opciones para el select de los equipos.
	equipos: SelectOptions[] = [];
	
	opcionesCheckbox: string[] = [
		'teclado',
		'pantalla',
		'raton',
		'cableEthernet',
		'software',
	];


	constructor( private authService: AuthService, private ticketsService: TicketsService, private router: Router, private alertService: AlertService) { }	

	ngOnInit() {
		this.formulario = new FormGroup({
			titulo: 		new FormControl('', Validators.required),
			descripcion: 	new FormControl('', Validators.required),
			componentes: 	new FormArray([
							new FormControl(false),
							new FormControl(false),
							new FormControl(false),
							new FormControl(false),
							new FormControl(false)
							]),
			otro: 			new FormControl(''),
			equipo:			new FormControl('', Validators.required)
		})

		if ( !this.authService.alumno ) {
			this.authService.consultarDatosUsuario().then( () => {
				this.obtenerEquiposDelAlumno();
			});
		} else {
			this.obtenerEquiposDelAlumno();
		}
	}
	

	enviarFormulario() {
		// Se le avisa a los componentes hijos que el formulario ya se envió.
		// this.formularioEnviado.next(true);
		
		if ( this.formulario.valid ) {
			// this.alertService.cargando('Cargando...', '');
			// EXTRACCIÓN DE VALORES DEL FORMULARIO...
			this.ticket = new TicketModel();
			this.ticket.titulo = 					 this.formulario.get('titulo').value;
			this.ticket.descripcion = 				 this.formulario.get('descripcion').value;

			// Recorrer los checkboxes de componentes.
			(this.formulario.get('componentes') as FormArray).controls.forEach( (control, i) => {
				const componente = this.opcionesCheckbox[i]; // e.g. 'raton'
				this.ticket.dispositivos[componente] = control.value;  // e.g. ticket.disp.raton = true
			});

			this.ticket.dispositivos.otro = this.formulario.get('otro').value;
			
			// Agregar los datos el alumno al ticket.
			this.ticket.agregarUsuario( this.authService.alumno );
			this.ticket.equipo.id = 	this.formulario.get('equipo').value;
			this.ticket.laboratorio =	this.laboratorioDeEquipo( this.ticket.equipo.id );
			this.ticket.equipo.nombre = this.nombreDeEquipo( this.ticket.equipo.id );
			this.ticket.timestamp = 	new Date().toDateString();
			this.ticket.urgencia = 1;
			console.log('Llego a antes de levantar');
			this.levantarTicket();
		}else{
			console.log('Formulario');
			console.log(this.formulario);
			this.alertService.mostrarError('Error ', 'No se levanto el Ticket')
		}
	}


	levantarTicket() {
		this.ticketsService.addTicket( this.ticket ).subscribe( respuesta => {
			this.alertService.success('Exito', 'Ticket Levantado exitosamente').then( () => {
				this.router.navigate(['tickets']);
			});

		}, err => {
			console.log(err);
		});
	}

	obtenerEquiposDelAlumno() {
		const fecha = new Date();
		const horaActual = fecha.getHours() * 60 + fecha.getMinutes();
		// horaActual = 500;

		// Equipos que tiene asignado en la clase de "ahora";
		const asignacionesActuales: AsignacionModel[] = [];

		console.log('Alumno: ', this.authService.alumno);
		

		Object.keys(this.authService.alumno.asignaciones).forEach( key => {
			const asignacion = this.authService.alumno.asignaciones[key];
			// Hora inicial y final de esta asignación.
			const horaInicial = asignacion.clase.horaInicial;
			const horaFinal = asignacion.clase.horaFinal;
			
			// Agregamos el equipo de esta asignación a las opciones del select.
			this.equipos.push({
				value: asignacion.equipo.id,
				name: `${ asignacion.equipo.nombre } - ${ asignacion.clase.laboratorio.toUpperCase() }`// PC-01 - LS1 
			});
			
			// Checamos si la clase de esta asignación es en el presente.
			if ( horaInicial <= horaActual && horaActual < horaFinal ) {
				asignacionesActuales.push( asignacion );
			}
		});	
	}

	/**
	 * Busca en las asignaciones del alumno loggeado y devuelve la clave del
	 * laboratorio donde está el equipo con el id que se manda por parámetro.
	 * 
	 * @param equipoID ID del equipo que se quiere buscar.
	 * @return Clave en mayúsculas del laboratorio donde se encuentra el equipo
	 * deseado.
	 */
	laboratorioDeEquipo( equipoID: string ) {
		const asignaciones = this.authService.alumno.asignaciones;
		for (const key in asignaciones) {
			if ( asignaciones.hasOwnProperty(key) ) {
				if ( asignaciones[key].equipo.id === equipoID ) {
					return asignaciones[key].clase.laboratorio.toUpperCase();
				}
			}
			
		}
	}

	nombreDeEquipo( equipoID: string ) {
		const asignaciones = this.authService.alumno.asignaciones;

		for (const key in asignaciones) {
			if ( asignaciones.hasOwnProperty(key) ) {
				if ( asignaciones[key].equipo.id === equipoID ) {
					return asignaciones[key].equipo.nombre;
				}
			}
			
		}
	}

	cancelar(){
		this.router.navigate(['tickets']);
	}

}
