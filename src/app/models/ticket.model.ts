import { AlumnoModel } from './alumno.model';
import { ProfesorModel } from './profesor.model';
import { ROLES, URGENCIAS_TIEMPO } from '../config/config';
import { UrgenciaItem, TipoTicketItem, IncidenciaComunItem } from '../shared/interfaces/interfaces';


export class TicketModel {

	id: string;
	timestamp: string;
	titulo: string;
	descripcion: string;
	dispositivos: {
		teclado: boolean,
		pantalla: boolean,
		raton: boolean,
		cableEthernet: boolean,
		software: boolean,
		otro: string
	} = { teclado: false, pantalla: false, raton: false, cableEthernet: false, software: false, otro: '' };
	laboratorio: string;
	equipo: {
		id: string,
		nombre: string
	} = { id: '', nombre: ''};
	urgencia: UrgenciaItem = { 
		id: 0,
		titulo: '', 
		tiempo: 0, 
		unidad: URGENCIAS_TIEMPO.MINUTO.value,
		color: ''
	};
	tipo: TipoTicketItem = {
		id: 0,
		titulo: ''
	};
	comun: IncidenciaComunItem = {
		id: 0,
		titulo: '',
		tipo: 0
	};
	estado: number;
	usuario: UsuarioInterface = { rol: null, matricula: '', nombre: '', apellidoP: '', apellidoM: ''};
	chat: MensajeInterface[] = [];
	encuesta: EncuestaInterface = {
		estado: 0,
		preguntas: [
			{ pregunta: '¿Cómo califica la rapidez del técnico al solucionar su problema?', respuesta: 0 },
			{ pregunta: '¿Cómo califica la solución que le dio el técnico?', respuesta: 0 },
			{ pregunta: 'Si habló por el chat, ¿cómo califica la atención del técnico?', respuesta: 0 },
			{ pregunta: 'Si habló por el chat, ¿cómo califica la rapidez del técnico en contestarle?', respuesta: 0 },
			{ pregunta: 'Si habló por el chat, ¿cómo califica su interfaz y usabilidad?', respuesta: 0 }
		],
		comentarios: ''
	};


	constructor( ticket?: TicketModel ) {
		if ( ticket ) {
			this.id = ticket.id;
			this.timestamp = ticket.timestamp;
			this.titulo = ticket.titulo;
			this.descripcion = ticket.descripcion;
			this.dispositivos = ticket.dispositivos;
			this.laboratorio = ticket.laboratorio;
			this.equipo = ticket.equipo;
			this.estado = ticket.estado;
			this.usuario = ticket.usuario;
			this.chat = ticket.chat;
			this.encuesta = ticket.encuesta;
			if ( ticket.urgencia ) { this.urgencia = ticket.urgencia; }
			if ( ticket.tipo ) { this.tipo = ticket.tipo; }
			if ( ticket.comun ) { this.comun = ticket.comun; }
			
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

export interface UsuarioInterface {

	rol: number;
	matricula: string;
	nombre: string;
	apellidoP: string;
	apellidoM: string;
	grupo?: string;
	estado?: number;

}

export interface MensajeInterface {
	matricula: string;
	nombre: string;
	mensaje: string;
	timestamp: string;
	img: string;
	sala?: string;
}

export interface EncuestaInterface {
	estado: number;
	preguntas: { pregunta: string, respuesta: number }[];
	comentarios: string;
}