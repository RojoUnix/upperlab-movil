import { AdminInfoModel } from './admin-info.model';

export class LaboratorioModel {
	id: string;
	nombre: string;
	private _clave: string;
	claveVieja: string; // Se utiliza para la modificación del laboratorio
	edificio: string;
	fotoUrl: string;
	encargados: string[] = [];
	ultimoNumEquipo: number = 0;
	nEquipos: number = 0;
	nIncidencias: number = 0;
	nIncidenciasUrgentes: number = 0;
	horasDisponibles: HorasDisponiblesInterface = {
		lunes: [],
		martes: [],
		miercoles: [],
		jueves: [],
		viernes: [],
		sabado: []
	};

	// Subcolecciones
	adminsInfo: {[key: string]: AdminInfoModel};

	constructor( laboratorio?: LaboratorioModel ) {

		if ( laboratorio ) {
			this.id = laboratorio.id;
			this.nombre = laboratorio.nombre;
			this._clave = laboratorio.clave;
			this.claveVieja = laboratorio.claveVieja;
			this.edificio = laboratorio.edificio;
			this.fotoUrl = laboratorio.fotoUrl;
			this.encargados = laboratorio.encargados || [];
			this.ultimoNumEquipo = laboratorio.ultimoNumEquipo || 0;
			this.nEquipos = laboratorio.nEquipos || 0;
			this.nIncidencias = laboratorio.nIncidencias || 0;
			this.nIncidenciasUrgentes = laboratorio.nIncidenciasUrgentes || 0;
			if ( laboratorio.horasDisponibles ) {
				this.horasDisponibles = laboratorio.horasDisponibles;
			}
		}
	}


	public set clave( clave: string ) {
		this._clave = clave.toUpperCase();
	}

	public get clave() {
		return this._clave;
	}

	toObject() {
		return {
			id: this.id,
			nombre: this.nombre,
			clave: this.clave,
			edificio: this.edificio,
			ultimoNumEquipo: this.ultimoNumEquipo,
			nEquipos: this.nEquipos,
			nIncidencias: this.nIncidencias,
			nIncidenciasUrgentes: this.nIncidenciasUrgentes,
			fotoUrl: this.fotoUrl
		};
	}



	// constructor() {

	// 	this.adminInfo = {admin: new AdminInfo(), admin2: new AdminInfo()};

	// 	this.adminInfo.admin.administradorID = 1;
	// 	this.adminInfo.admin2.administradorID = 1;
	// 	this.adminInfo.admin3.administradorID = 1;
		
	// }
	
}

export interface HorasDisponiblesInterface {
	lunes: string[];
	martes: string[];
	miercoles: string[];
	jueves: string[];
	viernes: string[];
	sabado: string[];
}
