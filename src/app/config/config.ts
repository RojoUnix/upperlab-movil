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


// [ngClass]="{'no-urgente': ticket.urgencia === URGENCIAS_TICKET.NO_URGENTE,
// 			   'normal': ticket.urgencia === URGENCIAS_TICKET.NORMAL}

// export const URGENCIAS_TICKET = {
// 	NO_URGENTE: 1,
// 	// COLOR: 'rgb(0, 176, 240, 100)'

// 	NORMAL: 2,
// 	// COLOR: 'rgb(0, 176, 80, 100)'

// 	URGENTE: 3,
// 	// COLOR: 'rgb(255, 255, 0, 100)'

// 	MUY_URGENTE: 4,
// 	// COLOR: 'rgb(227, 108, 10, 100)'

// 	INMEDIATO: 5
// 	// COLOR: 'rgb(255, 0, 0, 100)'
// };

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


// export const GRIDSTER_OPTIONS = {
// 	gridType: GridType.Fit,
// 	mobileBreakpoint: 120,
// 	displayGrid: DisplayGrid.Always,
// 	fixedColWidth: 90,
// 	fixedRowHeight: 75,
// 	enableEmptyCellDrop: true,
// 	margin: 5,
// 	// outerMarginRight: 25,
// 	pushItems: true,
// 	pushDirections: { north: true, east: false, south: true, west: false },
// 	draggable: { enabled: true },
// 	resizable: { enabled: true, handles: { s: true, e: false, n: false, w: false, se: false, ne: false, sw: false, nw: false } },

// 	minCols: 7,
// 	maxCols: 7,
// 	minRows: 14,
// 	maxRows: 14,

// 	maxItemCols: 1,
// 	minItemCols: 1,
// 	minItemRows: 1,
// 	maxItemRows: 14,

// 	minItemArea: 1,
// 	maxItemArea: 14,

// 	defaultItemCols: 1,
// 	defaultItemRows: 1
// };


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
