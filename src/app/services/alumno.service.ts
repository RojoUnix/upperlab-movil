import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { URL_SERVICIOS } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class AlumnosService {

	URL_ALUMNOS = URL_SERVICIOS + '/alumno';
	
	constructor( public http: HttpClient, private storage: Storage/*private archivosService: ArchivosService*/) { }
	
	getAlumnoPorMatricula( matricula: String ): Observable<any>  {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			// console.log('Token 1: ', token);
			const url = this.URL_ALUMNOS + `/${ matricula }?token=${ token }`;
			return this.http.get(url);
		}));
	}
	
	getAsignacionesDeAlumno( matricula: String ): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap ( token => {
			// console.log('Token 2: ', token);
			const url = this.URL_ALUMNOS + `/asignacion/${ matricula }?token=${ token }`;
			return this.http.get(url);
		}));
	}
	// getAlumnosPorGrupo( generacion: string, carrera: string, grupo: string ): Observable<any> {
	// 	const token = this.storage.get('token');
	// 	const url = this.URL_ALUMNOS + `/${ generacion }/${ carrera }/${ grupo }?token=${ token }`;
	// 	return this.http.get(url);
	// }
	
	// getAlumnoPorMatricula( matricula: string ): Observable<any> {
	// 	const token = this.storage.get('token');
	// 	const url = this.URL_ALUMNOS + `/${ matricula }?token=${ token }`;
	// 	return this.http.get(url);
	// }
	
	// async getAsignacionesDeAlumno( matricula: string ): Promise<any> {
	// 	await this.storage.get('token').then(  token => {
	// 		const url = URL_SERVICIOS + `alumno/asignacion/${ matricula }?token=${ token }`;			
	// 		return this.http.get(url);
	// 	});
	// }

	// getAsignacionesDeAlumnoPorClase( matricula: string, claseID: string, clave: string ): Observable<any> {
	// 	const token = this.storage.get('token');
	// 	console.log(token);
	// 	const url = URL_ALUMNOS + `/asignacion/${ matricula }/${ claseID }/${ clave }?token=${ token }`;
	// 	return this.http.get(url);
	// }
	
	// getAlumnosPorMatriculas( matriculas: string[] ): any {
	// 	const token = this.storage.get('token');
	// 	const url = URL_ALUMNOS + `?token=${ token }&matriculas=${ matriculas.join('&matriculas=') }`;
	// 	return this.http.get(url);
	// }
	
	// getAlumnosPorMatriculasConAsignaciones( matriculas: string[], claseID: string, clave: string ): any {
	// 	const token = this.storage.get('token');
	// 	const url = URL_ALUMNOS + `/asignaciones/matriculas/${ claseID }/${ clave }/?token=${ token }&matriculas=${ matriculas.join('&matriculas=') }`;
	// 	return this.http.get(url);
	// }

	// addAlumno( alumno: AlumnoModel ): Observable<any> {
	// 	const token = this.storage.get('token');
	// 	const url = URL_SERVICIOS + '/alumno?token=' + token;
	// 	return this.http.post(url, {alumno});
	// }

	// addMultiplesAlumnos( archivoExcel: File ): Promise<any> {
	// 	const token = this.storage.get('token');
	// 	const url = URL_SERVICIOS + '/alumno/multiple?token=' + token;
	// 	return this.archivosService.addMultiplesUsuarios( archivoExcel, url );
	// }

	// updateAlumno( alumno: AlumnoModel ): Observable<any> {
	// 	const token = this.storage.get('token');
	// 	const url = URL_SERVICIOS + '/alumno?token=' + token;
	// 	return this.http.put(url, {alumno});
	// }

	// deleteAlumno( matricula: string ): Observable<any> {
	// 	const token = this.storage.get('token');
	// 	const url = this.URL_ALUMNOS + `/${ matricula }?token=${ token }`;
	// 	return this.http.delete(url);
	// }


	// asignarEquipo( asignacion: AsignacionModel ): Observable<any> {
	// 	const token = this.storage.get('token');
	// 	const url = URL_SERVICIOS + '/alumno/asignacionSimple?token=' + token;
	// 	return this.http.put(url, {asignacion});
	// }


	// actualizarAsignaciones( asignacion: AsignacionModel ): Observable<any> {
	// 	console.log('Actualizar Asignaciones HTTP');
	// 	const token = this.storage.get('token');
	// 	const url = URL_ALUMNOS + `/asignaciones?token=${ token }`;
	// 	return this.http.put(url, { asignacion });
	// }

	// eliminarAsignaciones( claseID: string, diaLaboratorio: string ): Observable<any> {
	// 	console.log('Eliminar Asignaciones HTTP');
	// 	const token = this.storage.get('token');
	// 	const url = URL_ALUMNOS + `/asignaciones/${ claseID }/${ diaLaboratorio }?token=${ token }`;
	// 	return this.http.delete(url);
	// }

	// eliminarAsignacion( matricula: string, asignacionID: string,  ): Observable<any> {
	// 	const token = this.storage.get('token');
	// 	const url = URL_ALUMNOS + `/asignacion/${ matricula }/${ asignacionID }?token=${ token }`;
	// 	return this.http.delete(url);
	// }
}