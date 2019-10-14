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
}