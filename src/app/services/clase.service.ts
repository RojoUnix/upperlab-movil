import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { URL_SERVICIOS } from '../../environments/environment';
import { ClaseModel } from '../models/clase.model';
import { Storage } from '@ionic/storage';
import { mergeMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ClasesService {

	URL_CLASES: string = URL_SERVICIOS + '/clase';
	
	constructor( private http: HttpClient, private storage: Storage ) { }
	
	getClasesPorCarreraYGrupo( carreraID: string, grupo: string ): Observable<any> {
		return from( this.storage.get('token')).pipe( mergeMap (token => {
		const url = this.URL_CLASES + `/lista/${ carreraID }/${ grupo }?token=${ token }`;
		return this.http.get(url);	
		}));
	}
	
	// Sin usar
	getClasesSinHorario(): Observable<any> {
		return from(this.storage.get('token')).pipe( mergeMap( token =>{
		const url = this.URL_CLASES + '/sinHorario?token=' + token;
		return this.http.get(url);
		}));
	}
	
	getClasesConHorario( claveLaboratorio: string ): Observable<any> {
		return from( this.storage.get('token')).pipe(mergeMap(token => {
			const url = this.URL_CLASES + `/conHorario/${ claveLaboratorio }?token=${ token }`;
			return this.http.get(url);
		}))
	}
	
	getClasesDelProfesor( matricula: string ): Observable<any> {
		return from( this.storage.get('token')).pipe(mergeMap(token => {
			const url = this.URL_CLASES + `/profesor/${ matricula }?token=${ token }`;
			return this.http.get(url);	
		}))
	}
	
	getClasePorID( claseID: string ): Observable<any> {
		return from( this.storage.get('token')).pipe(mergeMap(token => {
			const url = this.URL_CLASES + `/${ claseID }?token=${ token }`;
			return this.http.get(url);		
		}))
	}
	
	addClase( clase: ClaseModel ): Observable<any> {
		return from( this.storage.get('token')).pipe(mergeMap(token => {
			const url = this.URL_CLASES + '?token=' + token;
			return this.http.post(url, { clase });
		}))
	}
	
	updateClase( clase: ClaseModel ): Observable<any> {
		return from( this.storage.get('token')).pipe(mergeMap(token => {
			const url = this.URL_CLASES + '?token=' + token;
			return this.http.put(url, { clase });
		}))
	}
	
	deleteClase( claseID: string ): Observable<any> {
		return from( this.storage.get('token')).pipe(mergeMap(token => {
			const url = this.URL_CLASES + `/${ claseID }?token=${ token }`;
			return this.http.delete(url);
		}))
	}
	
	setHorarioDeClases( clases: ClaseModel[] ): Observable<any> {
		return from( this.storage.get('token')).pipe(mergeMap(token => {
			const url = this.URL_CLASES + '/horarios?token=' + token;
			return this.http.post(url, { clases });		
		}))
	}
}
