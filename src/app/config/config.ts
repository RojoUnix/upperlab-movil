// import { GridType, DisplayGrid } from 'angular-gridster2';

// WARNING: NO CAMBIAR LA CONFIGURACIÓN DE ROLES. Algunas colecciones en la BD
// están basadas en esta configuración. Si se cambiase, se necesitaría cambiar
// los valores de todas los documentos en esas colecciones.
// Colecciones afectadas: 1) tickets (TicketModel)
export const ROLES = {
	ALUMNO: 1,
	PROFESOR: 2,
	ADMINISTRADOR: 3,
	SUPERADMINISTRADOR: 4
};

export const ESTADOS_TICKET = {
	NUEVO: 1,
	EN_PROCESO: 2,
	RESUELTO: 3,
	NO_RESUELTO: 4,
	CANCELADO: 5
};

export const ESTADOS_SOLICITUD = {
	NUEVO: 1,
	ACEPTADO: 2,
	RECHAZADO: 3,
	CANCELADO: 4
};

export const TIPOS_SOLICITUD = {
	DE_PROFESOR: 1,
	DE_ALUMNO: 2
};


export const ESTADOS_ENCUESTA = {
	NO_DISPONIBLE: 0,
	DISPONIBLE: 1,
	CONTESTADA: 2
};


export const ESTADOS_EQUIPO = {
	ESTABLE: 1,
	INCIDENCIA: 2,
	URGENTE: 3
};

export const ESTADOS_COMPONENTE = {
	ESTABLE: 1,
	DESMONTADO: 2
};

export const ESTADOS_SANCION = {
	PENDIENTE: 1,
	CUMPLIDA: 2,
	CANCELADA: 3
};


export const MATRICULA_WOLFBOT = 'WOLFBOT1423';

// Constantes de nombres de las clasificaciones
export const CLASIFICACIONES_NOMBRES = {
	URGENCIAS: 'urgencias',
	TIPOS_TICKET: 'tipos',
	INCIDENCIA_COMUNES: 'comunes'

};

export const URGENCIAS_TIEMPO = {
	MINUTO: { value: 'minuto', 	name: 'Minutos' },
	HORA: 	{ value: 'hora', 	name: 'Horas' 	},
	DIA: 	{ value: 'dia', 	name: 'Días' 	},
	SEMANA: { value: 'semana', 	name: 'Semanas' }
};
