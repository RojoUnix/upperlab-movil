import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import { TicketModel } from '../../models/ticket.model';
import { AuthService } from '../../services/auth.service';
import { TicketsService } from '../../services/tickets.service';
import { Router } from '@angular/router';
import { AsignacionModel } from '../../models/alumno.model';
import { AlertService } from '../../services/alert.service';
import { SelectOptions, Clasificaciones, IncidenciaComunItem, TipoTicketItem, UrgenciaItem, SelectOptionsNumber } from '../../shared/interfaces/interfaces';
import { ESTADOS_TICKET } from '../../config/config';
import { ClasificacionesService } from '../../services/clasificaciones.service';


@Component({
	selector: 'app-nuevo-ticket',
	templateUrl: './nuevo-ticket.page.html',
	styleUrls: ['./nuevo-ticket.page.scss'],
})
export class NuevoTicketPage implements OnInit {
	
	// Opciones para el select de los equipos.
	clasificaciones: Clasificaciones;
	urgenciasOpciones: SelectOptionsNumber[] = [];
	tiposOpciones: SelectOptionsNumber[] = [];
	comunesOpciones: SelectOptionsNumber[] = [];
	equipos: SelectOptions[] = [];
	
	formulario: FormGroup;
	ticket: TicketModel;

	opcionesCheckbox: string[] = [
		'teclado',
		'pantalla',
		'raton',
		'cableEthernet',
		'software',
	];


	constructor( private authService: AuthService, private clasificacionesService: ClasificacionesService, private ticketsService: TicketsService, private router: Router, private alertService: AlertService) { }	

	ngOnInit() {
		this.formulario = new FormGroup({
			titulo: 		 new FormControl('', Validators.required),
			descripcion: 	 new FormControl('', Validators.required),
			componentes: 	 new FormArray([
							 new FormControl(false),
							 new FormControl(false),
							 new FormControl(false),
							 new FormControl(false),
							 new FormControl(false)
							 ]),
			otro: 			 new FormControl(''),
			equipo:			 new FormControl('', Validators.required),
			urgencia:		 new FormControl('', Validators.required),
			tipo: 			 new FormControl('', Validators.required),
			incidenciaComun: new FormControl('')
			
		});

		this.consultarClasificaciones();
		/**
		 * Si el AuthService no tiene aún los datos del alumno, lo mandamos a
		 * que los consulte.
		 */
		if ( !this.authService.alumno ) {
			this.authService.consultarDatosUsuario().then( () => {
				this.obtenerEquiposDelAlumno();
			}).catch(() => {});
		} else {
			this.obtenerEquiposDelAlumno();
		}
	}
	
	consultarClasificaciones() {
		this.clasificacionesService.getClasificaciones().subscribe( respuesta => {
			console.log('Respuesta');
			console.log(respuesta);
			this.clasificaciones = respuesta.clasificaciones;
			

			if ( !this.clasificaciones.urgencias  || !this.clasificaciones.urgencias.items ) {
				this.clasificaciones.urgencias = { items: [], idDisponible: 1};
			}
			
			if ( !this.clasificaciones.tipos || !this.clasificaciones.tipos.items ) {
				this.clasificaciones.tipos = { items: [], idDisponible: 1};
			}

			if ( !this.clasificaciones.comunes || !this.clasificaciones.comunes.items ) {
				this.clasificaciones.comunes = { items: [], idDisponible: 1}; 
			}

			this.pasarClasificacionesAOpciones();
		});
	}

	
	pasarClasificacionesAOpciones() {
		// Urgencias
		this.clasificaciones.urgencias.items.forEach( urgencia => {
			this.urgenciasOpciones.push({
				value: urgencia.id,
				name: urgencia.titulo
			});
		});

		// Tipos de Tickets
		this.clasificaciones.tipos.items.forEach( tipo => {
			this.tiposOpciones.push({
				value: tipo.id,
				name: tipo.titulo
			});
		});

		// Incidencias Comnunes
		this.clasificaciones.comunes.items.forEach( incidenciaComun => {
			this.comunesOpciones.push({
				value: incidenciaComun.id,
				name: incidenciaComun.titulo
			});
		});
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
			
			//Clasificaciones
			this.ticket.urgencia = 		this.obtenerUrgenciaItem(
				+this.formulario.get('urgencia').value);
			this.ticket.tipo = this.obtenerIncidenciaComunItem(
				+this.formulario.get('tipo').value);
			this.ticket.comun = this.obtenerIncidenciaComunItem(
				+this.formulario.get('incidenciaComun').value);
			this.ticket.estado = ESTADOS_TICKET.NUEVO;

			console.log(this.ticket);

			this.levantarTicket();
		}else{
			// console.log('Formulario');
			// console.log(this.formulario);
			// this.alertService.mostrarError('Error ', 'No se levanto el Ticket');
		}
	}

	obtenerTipoDeTicketItem( tipoID: number): TipoTicketItem{
		return this.clasificaciones.tipos.items.filter( tipo => tipo.id === tipoID )[0];
	}

	obtenerIncidenciaComunItem( comunID: number ): IncidenciaComunItem {
		if ( comunID !== 0 ) {
			return this.clasificaciones.comunes.items.filter( comun => comun.id === comunID )[0];
		}
		return { id: 0, titulo: '', tipo: 0 };
	}

	obtenerUrgenciaItem( urgenciaID: number): UrgenciaItem{
		return this.clasificaciones.urgencias.items.filter( urgencia => urgencia.id === urgenciaID)[0];
	}

	/**
	 * Levanta un nuevo ticket enviando una petición HTTP con ayuda del
	 * ticketsService.
	 */
	levantarTicket() {
		console.log('Levantando ticket ... ', this.ticket);
		this.ticketsService.addTicket( this.ticket ).subscribe( respuesta => {
			this.alertService.success('Exito', 'Ticket Levantado exitosamente').then( () => {
				this.router.navigate(['tickets']);
				// TODO: Poner pop para quitar el page de encima.
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
			if( !this.equipoYaPusheado(asignacion.equipo.id)){
				this.equipos.push({
					value: asignacion.equipo.id,
					name: `${ asignacion.equipo.nombre } - ${ asignacion.clase.laboratorio.toUpperCase() }`// PC-01 - LS1 
				});
			}
			
			// Checamos si la clase de esta asignación es en el presente.
			if ( horaInicial <= horaActual && horaActual < horaFinal ) {
				asignacionesActuales.push( asignacion );
			}
		});

		this.ordenarEquipos();	

		this.ponerPorDefectoEquipoPermanente( asignacionesActuales );
	}

	equipoYaPusheado( equipoID: string ): boolean {
		return this.equipos.filter( equipo => equipo.value === equipoID ).length > 0;
	}

	ordenarEquipos() {
		this.equipos.sort((a, b) => (a.name > b.name) ? 1 : -1);
	}

	ponerPorDefectoEquipoPermanente( asignacionesActuales: AsignacionModel[] ) {
		if ( asignacionesActuales.length > 1 ) {
			asignacionesActuales.forEach( asignacion => {
				if ( asignacion.tipo !== 'temporal' ) {
					this.formulario.get('equipo').setValue(asignacion.equipo.id);
				}
			});
		}
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
		this.router.navigate(['/alumno/tickets']);
		// TODO: Poner pop para quitar el page de encima.

	}

}
