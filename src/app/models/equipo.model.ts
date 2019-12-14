
import { ESTADOS_EQUIPO, ESTADOS_COMPONENTE } from 'src/app/config/config';

export class EquipoModel {
	id: string;
	nombre: string = 'PC-';
	laboratorio: string;
	estado: number = ESTADOS_EQUIPO.ESTABLE; // 1: Estable(Por Defecto), 2: Incidencia, 3: Incidencia Urgente
	incidenciasReportadas: number =  0;
	tarjetaMadre: NombreMarca = { estado: ESTADOS_COMPONENTE.ESTABLE, nombre: '', marca: '' };
	procesador: NombreMarcaVelocidad = { estado: ESTADOS_COMPONENTE.ESTABLE, nombre: '', marca: '', velocidad: '' };
	ram: NomMarcaCantUnidad = { estado: ESTADOS_COMPONENTE.ESTABLE, nombre: '', marca: '', cantidad: 0, unidad: 'GB' };
	tarjetaDeVideo: NomMarcaCantUnidad = { estado: ESTADOS_COMPONENTE.ESTABLE, nombre: '', marca: '', cantidad: 0, unidad: 'GB' };
	discoDuro: NomMarcaCantUnidad = { estado: ESTADOS_COMPONENTE.ESTABLE, nombre: '', marca: '', cantidad: 0, unidad: 'GB' };
	fuenteDePoder: NombreMarcaCapacidad  = { estado: ESTADOS_COMPONENTE.ESTABLE, nombre: '', marca: '', capacidad: '' };
	monitor: Monitor = { estado: ESTADOS_COMPONENTE.ESTABLE, nombre: '', marca: '', pulgadas: '', resolucion: '' };
	teclado: NombreMarca = { estado: ESTADOS_COMPONENTE.ESTABLE, nombre: '', marca: '' };
	raton: NombreMarca = { estado: ESTADOS_COMPONENTE.ESTABLE, nombre: '', marca: '' };
	// tipo?: string;
	
	constructor( equipo?: EquipoModel, plantilla: boolean = false) {
		if ( equipo ) {
			this.id = equipo.id;
			this.nombre = equipo.nombre;
			this.laboratorio = equipo.laboratorio;
			this.estado = equipo.estado || ESTADOS_EQUIPO.ESTABLE;
			this.incidenciasReportadas = equipo.incidenciasReportadas || 0;
			this.tarjetaMadre = equipo.tarjetaMadre;
			this.procesador = equipo.procesador;
			this.ram = equipo.ram;
			this.tarjetaDeVideo = equipo.tarjetaDeVideo;
			this.discoDuro = equipo.discoDuro;
			this.fuenteDePoder = equipo.fuenteDePoder;
			this.monitor = equipo.monitor;
			this.teclado = equipo.teclado;
			this.raton = equipo.raton;
			// if ( equipo.tipo ) {
			// 	this.tipo = equipo.tipo;
			// }
			if ( plantilla ) { this.inicializarComponentes(); }
		}
	}

	getEstadoString() {
		switch (this.estado) {
			case 1: return 'Estable';
			case 2: return 'Incidencia';
			case 3: return 'Urgente';
		}
	}

	// Se re-asignan los atributos pero en un orden establecido. ( 1. Tarjeta Madre, ...)
	guardarParaDetalles( equipo: EquipoModel ) {
		this.tarjetaMadre = equipo.tarjetaMadre;
		this.procesador = equipo.procesador;
		this.ram = equipo.ram;
		this.tarjetaDeVideo = equipo.tarjetaDeVideo;
		this.discoDuro = equipo.discoDuro;
		this.fuenteDePoder = equipo.fuenteDePoder;
		this.monitor = equipo.monitor;
		this.teclado = equipo.teclado;
		this.raton = equipo.raton;
		this.nombre = equipo.nombre;
		// this.tipo = equipo.tipo;
		this.id = equipo.id;
	}

	inicializarComponentes() {
		this.tarjetaMadre.estado = ESTADOS_COMPONENTE.ESTABLE;
		this.procesador.estado = ESTADOS_COMPONENTE.ESTABLE;
		this.ram.estado = ESTADOS_COMPONENTE.ESTABLE;
		this.tarjetaDeVideo.estado = ESTADOS_COMPONENTE.ESTABLE;
		this.discoDuro.estado = ESTADOS_COMPONENTE.ESTABLE;
		this.fuenteDePoder.estado = ESTADOS_COMPONENTE.ESTABLE;
		this.monitor.estado = ESTADOS_COMPONENTE.ESTABLE;
		this.teclado.estado = ESTADOS_COMPONENTE.ESTABLE;
		this.raton.estado = ESTADOS_COMPONENTE.ESTABLE;
	}
}

export interface NombreMarca {
	estado: number;
	nombre: string;
	marca: string;
}

export interface NombreMarcaVelocidad {
	estado: number;
	nombre: string;
	marca: string;
	velocidad: string;
}

export interface NombreMarcaCapacidad {
	estado: number;
	nombre: string;
	marca: string;
	capacidad: string;
}

export interface NomMarcaCantUnidad {
	estado: number;
	nombre: string;
	marca: string;
	cantidad: number;
	unidad: string;
}

export interface Monitor {
	estado: number;
	nombre: string;
	marca: string;
	pulgadas: string;
	resolucion: string;
}