export class ClaseModel {
	claseID: string;
	tipo: string;
	grupoID: string;
	carreraID: string;
	cuatrimestre: string;
	materiaID: string;
	materia: string;
	profesorID: string;
	profesor: string;
	laboratorios: string[] = [];
	dias: string[] = [];
	alumnos: string[] = [];
	configuracion: {[key: string]: number} = {
		minRetardo: 10,
		minFalta: 15
	};

	horario: {[key: string]: {horaInicial?: number, horaFinal?: number}} = null;


	constructor( clase?: ClaseModel ) {
		if ( clase ) {
			this.claseID = clase.claseID;
			this.tipo = clase.tipo;
			this.grupoID = clase.grupoID;
			this.carreraID = clase.carreraID;
			this.cuatrimestre = clase.cuatrimestre;
			this.materiaID = clase.materiaID;
			this.materia = clase.materia;
			this.profesorID = clase.profesorID;
			this.profesor = clase.profesor;
			this.laboratorios = clase.laboratorios;
			this.dias = clase.dias;
			this.alumnos = clase.alumnos;
			this.configuracion = clase.configuracion;
			this.horario = clase.horario;
		}
	}

	getGrupo() {
		return this.grupoID.split('-')[2];
	}

	getCarrera() {
		return this.grupoID.split('-')[1];
	}

	getGeneracion() {
		return this.grupoID.split('-')[0];
	}

	toJson() {
		return {
			claseID: this.claseID,
			tipo: this.tipo,
			grupoID: this.grupoID,
			carreraID: this.carreraID,
			cuatrimestre: this.cuatrimestre,
			materiaID: this.materiaID,
			materia: this.materia,
			profesorID: this.profesorID,
			profesor: this.profesor,
			laboratorios: this.laboratorios,
			dias: this.dias,
			alumnos: this.alumnos,
			configuracion: this.configuracion,
			horario: this.horario
		};
	}

	toJsonClaseForm() {
		return {
			tipo: this.tipo,
			carrera: this.getCarrera(),
			grupo: this.grupoID,
			materia: this.materiaID,
			profesor: this.profesorID
		};
	}
	
}