import { EquipoModel } from './equipo.model';

export class AlumnoModel {
	matricula: string;
	nombre: string;
	apellidoP: string;
	apellidoM: string;
	correo: string;
	generacion: string;
	carrera: string;
	grupo: string;
	asignaciones: {[key: string]: AsignacionModel};
	fotoUrl: string;
	errores: string;
	warning: string;

	constructor( alumno?: AlumnoModel ) {
		
		if (alumno) {
			this.matricula = alumno.matricula;
			this.nombre = alumno.nombre;
			this.apellidoP = alumno.apellidoP;
			this.apellidoM = alumno.apellidoM;
			this.correo = alumno.correo;
			this.generacion = alumno.generacion;
			this.carrera = alumno.carrera;
			this.grupo = alumno.grupo;
			this.asignaciones = alumno.asignaciones;
			this.fotoUrl = alumno.fotoUrl;
			this.errores = alumno.errores;
			this.warning = alumno.warning;
		}
	}
	
	camposDeForm() {
		return {
			matricula: this.matricula,
			nombre: this.nombre,
			apellidoP: this.apellidoP,
			apellidoM: this.apellidoM,
			correo: this.correo,
			generacion: this.generacion,
			carrera: this.carrera,
			grupo: this.grupo
		};
	}
}

export class AsignacionModel {

	tipo: string;
	equipo: {
		id: string,
		nombre: string
	};
	alumno: {
		matricula: string,
		nombre: string,
		apellidoP: string,
		apellidoM: string,
		correo: string,
		grupoID: string
	};
	clase: {
		id: string;
		tipo: string,
		dia: string,
		laboratorio: string,
		horaInicial: number,
		horaFinal: number
	};
	fechaExpiracion?: string;

	constructor( clase: any, laboratorio: any, dia: string, tipo: string = 'Permanente' ) {
		const claveLaboratorio = laboratorio.clave.toLowerCase();

		this.tipo = tipo;
		this.clase = {
			id: clase.claseID,
			tipo: clase.tipo,
			dia,
			laboratorio: claveLaboratorio,
			horaInicial: clase.horario[dia.toLowerCase() + '-' + claveLaboratorio].horaInicial,
			horaFinal: clase.horario[dia.toLowerCase() + '-' + claveLaboratorio].horaFinal
		};
	}

	agregarAlumno( alumno: AlumnoModel ) {
		this.alumno = {
			matricula: alumno.matricula,
			nombre: alumno.nombre,
			apellidoP: alumno.apellidoP,
			apellidoM: alumno.apellidoM,
			correo: alumno.correo,
			grupoID: alumno.grupo
		};
	}

	agregarEquipo( equipo: EquipoModel ) {
		this.equipo = {
			id: equipo.id,
			nombre: equipo.nombre
		};
	}

	agregarFechaDeExpiracion( diasParaExpirar: number ) {
		const fecha = new Date();
		fecha.setDate(fecha.getDate() + diasParaExpirar - 1);
		fecha.setHours(0, 0, 0, 0);
		this.fechaExpiracion = `${fecha.getDate()}-${fecha.getMonth() + 1}-${ fecha.getFullYear() }`;
	}

	setTemporal() {
		this.tipo = 'temporal';
	}

	setPermanente() {
		this.tipo = 'Permanente';
	}
}