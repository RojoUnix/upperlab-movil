import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClaseModel } from '../../../../models/clase.model';
import { LaboratorioModel } from '../../../../models/laboratoriomodel';
import { SelectOptions, SelectOptionsNumber } from '../../../../shared/interfaces/interfaces';
import { Subject } from 'rxjs';
import { SolicitudesService } from '../../../../services/solicitudes.service';
import { ClasesService } from '../../../../services/clase.service';
import { AuthService } from '../../../../services/auth.service';
import { LaboratoriosService } from '../../../../services/laboratorios.service';
import { firstUC } from '../../../../utils/utils';
import { SolicitudModel } from '../../../../models/solicitud.model';
import { ESTADOS_SOLICITUD, TIPOS_SOLICITUD } from '../../../../config/config';


@Component({
	selector: 'app-levantar-solicitud-profesor',
	templateUrl: './levantar-solicitud-profesor.component.html',
	styleUrls: ['./levantar-solicitud-profesor.component.css']
})
export class LevantarSolicitudProfesorComponent implements OnInit {
	
	laboratorios: LaboratorioModel[] = [];
	clases: ClaseModel[] = [];
	
	formulario: FormGroup;
	clasesOptions: SelectOptions[] = [];
	laboratoriosOptions: SelectOptions[] = [];
	especificarHorario: boolean = false;
	diasOptions: SelectOptions[] = [];
	horasInicialesOptions: SelectOptionsNumber[] = [];
	horasFinalesOptions: SelectOptionsNumber[] = [];
	duracionDeClase: number;

	formularioEnviado$: Subject<boolean> = new Subject();

	constructor( private solicitudesService: SolicitudesService, private clasesService: ClasesService, private laboratoriosService: LaboratoriosService, private authService: AuthService ) { }
	
	ngOnInit() {

		

		if ( !this.authService.profesor ) {
			this.authService.consultarDatosUsuario().then(() => {}).catch(() => {});
		}


		this.formulario = new FormGroup({
			clase: new FormControl('', Validators.required),
			laboratorio: new FormControl('', Validators.required),
			cambioDeLaboratorio: new FormControl(false),
			especificarHorario: new FormControl(false),
			dia: new FormControl(''),
			horaInicial: new FormControl(''),
			horaFinal: new FormControl('')
		});

		this.formulario.get('dia').disable();
		this.formulario.get('horaInicial').disable();
		this.formulario.get('horaFinal').disable();

		this.consultarClaseDelProfesor( this.authService.usuario.email.split('@')[0].toUpperCase() );
		this.consultarLaboratorios();
	}
	
	
	consultarClaseDelProfesor( matricula: string ) {
		this.clasesService.getClasesDelProfesor( matricula ).subscribe( respuesta => {
			
			console.log('Clases');
			console.log(respuesta);

			if ( respuesta.status === 200 ) {
				
				const clasesIDs: string[] = [];
				this.clases = respuesta.clases || [];
				
				this.clases.forEach( clase => {
					clasesIDs.push( clase.claseID );
					this.clasesOptions.push({
						value: clase.claseID,
						name: clase.claseID
					});
				});
				
				if ( this.clasesOptions.length > 0 ) {
					// Settear a la primera opción del select.
					this.formulario.get('clase').setValue( this.clasesOptions[0].value );
				}
			}
			
		}, err => {
			// this.swalService.error('Error', err.error.message);
		});
	}

	
	consultarLaboratorios() {
		this.laboratoriosService.getLaboratorios().subscribe( respuesta => {
			console.log(respuesta);
			this.laboratorios = respuesta.laboratorios;

			this.laboratoriosOptions = this.laboratorios.map( laboratorio => {
				return {
					value: laboratorio.clave.toUpperCase(),
					name: laboratorio.nombre
				};
			});
		}, err => {
			// this.swalService.error('Error', err.error.message);
		});
	}

	cambiarValidatorsDelHorario() {
		const especificarHorario = this.formulario.get('especificarHorario').value;

		if ( especificarHorario ) {
			this.formulario.get('dia').setValidators(Validators.required);
			this.formulario.get('horaInicial').setValidators(Validators.required);
			this.formulario.get('horaFinal').setValidators(Validators.required);
			this.formulario.get('dia').updateValueAndValidity();
			this.formulario.get('horaInicial').updateValueAndValidity();
			this.formulario.get('horaFinal').updateValueAndValidity();
		} else {
			this.formulario.get('dia').clearValidators();
			this.formulario.get('horaInicial').clearValidators();
			this.formulario.get('horaFinal').clearValidators();
			this.formulario.get('dia').updateValueAndValidity();
			this.formulario.get('horaInicial').updateValueAndValidity();
			this.formulario.get('horaFinal').updateValueAndValidity();
		}
	}

	cambiarDiasDisponibles() {
		this.formulario.get('dia').reset('');
		this.formulario.get('horaInicial').reset('');
		this.formulario.get('horaInicial').disable();
		this.formulario.get('horaFinal').reset('');
		this.formulario.get('horaFinal').disable();

		const claveElegida = this.formulario.get('laboratorio').value;
		if ( claveElegida !== '' ) {

			const laboratorioElegido = this.getLaboratorio( claveElegida );
			const horasDisponibles = laboratorioElegido.horasDisponibles || {};

			/*~~~~~~~~~~~~~~~~~~ Inicio - Opciones de días ~~~~~~~~~~~~~~~~~~*/
			this.diasOptions = [];

			Object.keys( horasDisponibles ).forEach( dia => {
				
				if ( horasDisponibles[dia].length > 0 ) {
					this.diasOptions.push({
						value: dia,
						name: firstUC( dia )
					});
				}
			});
			
			this.ordernarDiasOptions();
			/*~~~~~~~~~~~~~~~~~~~~ FIN - Opciones de días ~~~~~~~~~~~~~~~~~~~*/
			

			this.formulario.get('dia').enable();
		} else {
			this.formulario.get('dia').setValue('');
			this.formulario.get('dia').disable();
		}
	}

	cambiarHorasIniciales( ) {
		this.formulario.get('horaInicial').reset('');
		this.formulario.get('horaFinal').reset('');
		this.formulario.get('horaFinal').disable();
		const claveElegida = this.formulario.get('laboratorio').value;
		
		if ( claveElegida !== '' ) {

			const laboratorioElegido = this.getLaboratorio( claveElegida );
			const diaElegido = this.formulario.get('dia').value;
			
			if ( diaElegido !== '' ) {
				const horasDisponibles: string[] = laboratorioElegido.horasDisponibles[diaElegido];

				this.horasInicialesOptions = [];
				
				horasDisponibles.forEach( hora => {
					let horaInicial: number = +hora.split('-')[0];
					const horaFinal: number = +hora.split('-')[1];
					
					while (+horaInicial < horaFinal) {

						this.horasInicialesOptions.push({
							value: +horaInicial,
							name: '' + horaInicial / 60 + ':00 hrs.'
						});

						horaInicial = +horaInicial + 60;
					}
				});
				this.formulario.get('horaInicial').enable();
			} else {
				this.formulario.get('horaInicial').setValue('');
				this.formulario.get('horaInicial').disable();
			}
		}
	}

	cambiarHorasFinales() {
		this.formulario.get('horaFinal').reset('');
		const claveElegida = this.formulario.get('laboratorio').value;
		
		if ( claveElegida !== '' ) {

			const laboratorioElegido = this.getLaboratorio( claveElegida );
			const diaElegido = this.formulario.get('dia').value;
			
			if ( diaElegido !== '' ) {
				
				const horasDisponibles: string[] = laboratorioElegido.horasDisponibles[diaElegido];
				let horaInicialElegida = this.formulario.get('horaInicial').value;

				if ( horaInicialElegida !== '' ) {
		
					let horaFinal: number;

					// Obtener la horaFinal del rango donde está la horaInicial elegida.
					for (const horaDisponible of horasDisponibles) {
						if ( this.estaEntreElRango( horaDisponible, +horaInicialElegida) ) {
							horaFinal = +horaDisponible.split('-')[1];
						}
						// if ( horaDisponible.includes('' + horaInicialElegida) ) {
							
						// }
					}

					this.horasFinalesOptions = [];

					while (+horaInicialElegida < horaFinal) {
						
						horaInicialElegida = +horaInicialElegida + 60;

						this.horasFinalesOptions.push({
							value: +horaInicialElegida,
							name: '' + horaInicialElegida / 60 + ':00 hrs.'
						});
					}
					
					this.formulario.get('horaFinal').enable();
					
				} else {
					this.formulario.get('horaFinal').setValue('');
					this.formulario.get('horaFinal').disable();
				}
			}
		}
	}

	calcularDuracionDeClase() {
		const horaInicialElegida = this.formulario.get('horaInicial').value;
		const horaFinalElegida = this.formulario.get('horaFinal').value;
		this.duracionDeClase = +horaFinalElegida - +horaInicialElegida;
	}

	estaEntreElRango( rango: string, hora: number ): boolean {
		let horaInicialRango: number = +rango.split('-')[0];
		const horaFinalRango: number = +rango.split('-')[1];

		while ( horaInicialRango < horaFinalRango ) {
			if ( horaInicialRango === hora ) {
				return true;
			}
			horaInicialRango += 60;
		}
		
		return false;
	}

	ordernarDiasOptions() {
		const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
		const diasOrdenados: SelectOptions[] = [];
		
		dias.forEach( dia => {
			const diaOption = this.existeDiaEnOptions(dia);
			if ( diaOption ) {
				diasOrdenados.push(diaOption);
			}
		});

		this.diasOptions = diasOrdenados;
	}

	existeDiaEnOptions( dia: string ): SelectOptions {
		for (const diaOption of this.diasOptions) {
			if ( diaOption.value === dia ) {
				return diaOption;
			}
		}
		return null;
	}

	getLaboratorio( clave: string ): LaboratorioModel {
		return this.laboratorios.filter( lab => lab.clave === clave )[0];
	}



	levantarSolicitud() {
		console.log(this.formulario);
		this.formularioEnviado$.next(true);

		if ( this.formulario.valid ) {
			
			// this.swalService.cargando('Creando solicitud...');

			console.log('Formulario Válido');
			const solicitud = new SolicitudModel();
			solicitud.agregarUsuario( this.authService.profesor );
			solicitud.timestamp = new Date().toDateString();
			solicitud.estado = ESTADOS_SOLICITUD.NUEVO;
			solicitud.clase = this.getClase( this.formulario.get('clase').value );
			const laboratorio = this.getLaboratorio( this.formulario.get('laboratorio').value );
			solicitud.laboratorio.clave = laboratorio.clave;
			solicitud.laboratorio.nombre = laboratorio.nombre;
			solicitud.dia = this.formulario.get('dia').value;
			solicitud.horaInicial = +this.formulario.get('horaInicial').value;
			solicitud.horaFinal = +this.formulario.get('horaFinal').value;
			solicitud.cambioDeLaboratorio = this.formulario.get('cambioDeLaboratorio').value;
			solicitud.tipo = TIPOS_SOLICITUD.DE_PROFESOR;

			this.crearSolicitud( solicitud );

		} else {
			console.log('Formulario No válido');
		}
	}

	getClase( claseID: string ): ClaseModel {
		return this.clases.filter( clase => clase.claseID === claseID)[0];
	}


	crearSolicitud( solicitud: SolicitudModel ) {
		
		this.solicitudesService.addSolicitud( solicitud ).subscribe( respuesta => {

			if ( respuesta.status === 201 ) {
				this.resetearForm();
				// this.swalService.success('Solicitud creada', respuesta.message);
			}

		}, err => {
			// this.swalService.error('Error', err.error.message);
		});
	}

	resetearForm() {
		this.formulario.reset({
			clase: '',
			laboratorio: '',
			cambioDeLaboratorio: false,
			especificarHorario: false,
			dia: '',
			horaInicial: '',
			horaFinal: ''
		});
	}
}
