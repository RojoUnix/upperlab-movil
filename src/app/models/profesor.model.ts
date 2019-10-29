export class ProfesorModel {
	matricula: string;
	nombre: string;
	apellidoP: string;
	apellidoM: string;
	correo: string;
	contrasena: string;
	carreras: {[key: string]: boolean};
	fotoUrl: string;
	errores: string;
	warning: string;

	constructor( profesor?: ProfesorModel ) {
		
		if (profesor) {
			this.matricula = profesor.matricula;
			this.nombre = profesor.nombre;
			this.apellidoP = profesor.apellidoP;
			this.apellidoM = profesor.apellidoM;
			this.correo = profesor.correo;
			this.carreras = profesor.carreras;
			this.fotoUrl = profesor.fotoUrl;
			this.errores = profesor.errores;
			this.warning = profesor.warning;
		}
	}
}
