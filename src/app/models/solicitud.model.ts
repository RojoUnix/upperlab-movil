import { ClaseModel } from './clase.model';
import { UsuarioInterface } from './ticket.model';
import { AlumnoModel } from './alumno.model';
import { ProfesorModel } from './profesor.model';
import { ROLES } from '../config/config';


export class SolicitudModel {
	
	id: string;
	tipo: number;
	estado: number;
	timestamp: string;
	laboratorio: { clave: string, nombre: string } = { clave: '', nombre: '' };
	clase?: ClaseModel;
	usuario: UsuarioInterface = { rol: null, matricula: '', nombre: '', apellidoP: '', apellidoM: ''};
	dia: string;
	horaInicial: number;
	horaFinal: number;
	cambioDeLaboratorio: boolean;

	constructor( solicitud?: SolicitudModel ) {
		if ( solicitud ) {
			this.id = solicitud.id;
			this.tipo = solicitud.tipo;
			this.estado = solicitud.estado;
			this.timestamp = solicitud.timestamp;
			this.laboratorio = solicitud.laboratorio;
			this.clase = solicitud.clase;
			this.usuario = solicitud.usuario;
			this.dia = solicitud.dia;
			this.horaInicial = solicitud.horaInicial;
			this.horaFinal = solicitud.horaFinal;
			this.cambioDeLaboratorio = solicitud.cambioDeLaboratorio;
		}
	}

	
	agregarUsuario( usuario: AlumnoModel | ProfesorModel ) {

		if ( usuario instanceof AlumnoModel ) {
			this.usuario.grupo = usuario.grupo;
			this.usuario.rol = ROLES.ALUMNO;
		} else {
			this.usuario.rol = ROLES.PROFESOR;
		}

		this.usuario.matricula = usuario.matricula;
		this.usuario.nombre = usuario.nombre;
		this.usuario.apellidoP = usuario.apellidoP;
		this.usuario.apellidoM = usuario.apellidoM;
		
	}

}
