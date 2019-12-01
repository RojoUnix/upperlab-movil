export interface SelectOptions {
	value: string;
	name: string;
	// [i: number]: {value: string, name: string};
}

export interface SelectOptionsBoolean {
	value: boolean;
	name: string;
}

export interface SelectOptionsNumber {
	value: number;
	name: string;
}

export interface CookieEquipo {
	equipo: {
		id: string,
		nombre: string
	};
	laboratorio: string;
}

export interface NotificacionInterface {
	titulo: string;
	link: any[];
}

export interface Clasificaciones {
	urgencias: UrgenciaDoc;
	tipos: TipoTicketDoc;
	comunes: IncidenciaComunDoc;
}

export interface UrgenciaDoc {
	items: UrgenciaItem[];
	idDisponible: number;
}

export interface UrgenciaItem {
	titulo: string;
	tiempo: number;
	unidad: string;
	color: string;
	id: number;
}

export interface TipoTicketDoc {
	items: TipoTicketItem[];
	idDisponible: number;
}

export interface TipoTicketItem {
	titulo: string;
	id: number;
}

export interface IncidenciaComunDoc {
	items: IncidenciaComunItem[];
	idDisponible: number;
}

export interface IncidenciaComunItem {
	titulo: string;
	tipo: number;
	id: number;
}


// Interface para Reporte Asistencia
export interface ReportesGrupo {
	generacion: string;
	carrera: string;
	grupo: string;
}

export interface RegistroNoAutorizado {
	alumno: {
		matricula: string,
		nombre: string,
		apellidoP: string,
		apellidoM: string,
		correo: string,
		grupo: string
	};
	clase?: {
		id: string,
		dia: string,
		horaInicial: number,
		horaFinal: number,
		laboratorio: string,
		tipo: string
	};
	equipoAsignado?: {
		id: string,
		nombre: string
	};
	equipoIngresado: {
		id: string,
		nombre: string
	};
	fecha: string;
	laboratorio: string;
	tipo: number;
}

export interface InputInterface {
	orden: number;
	label: string;
	type: string;
	generoMasculino: boolean;
	plural: boolean;
}

export interface MenuOption {
	nombre: string;
	icono: string;
	link: string[];
}

export interface HeaderOption {
	buttonType: number;
	url: string;
}
