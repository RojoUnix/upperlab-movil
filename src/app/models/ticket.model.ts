import { AlumnoModel } from './alumno.model';
import { ProfesorModel } from './profesor.model';
import { ROLES } from '../config/config';

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
	urgencia: number;
	estado: number;
	usuario: UsuarioInterface  =  { 
		rol: null,
		matricula: '', 
		nombre: '', 
		apellidoP: '', 
		apellidoM: ''
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
			this.urgencia = ticket.urgencia;
			this.estado = ticket.estado;
			this.usuario = ticket.usuario;
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

}

export interface MensajeInterface {
	matricula: string;
	nombre: string;
	mensaje: string;
	timestamp: string;
	img: string;
	sala: string;
}