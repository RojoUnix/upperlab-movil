import { URL_SERVICIOS } from './../../environments/environment';
import { Injectable } from '@angular/core';

// Models
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LaboratorioModel, HorasDisponiblesInterface } from '../models/laboratoriomodel';
import { Storage } from '@ionic/storage';
import { mergeMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class LaboratoriosService {
	
	URL_LABORATORIOS: string = `${ URL_SERVICIOS }/laboratorio`;
	
	// laboratorioCollectionRef: AngularFirestoreCollection<LaboratorioModel>;
	// laboratorio$: Observable<LaboratorioModel[]>;
	// adminInfo$: Observable<AdminInfoModel[]>;
  
	// laboratorio: LaboratorioModel;

	constructor( private http: HttpClient, private storage: Storage) { }

	/**
	 * Petición HTTP GET para obtener todos los laboratorios.
	 * 
	 * @return Observable con respuesta a la petición HTTP.
	 */
	getLaboratorios(): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = `${ this.URL_LABORATORIOS }?token=${ token }`;
			return this.http.get(url);
		}))
	}
	
	
	/**
	 * Petición HTTP GET para buscar laboratorios por edificio.
	 * 
	 * @param edificioAbreviatura Abreviatura del edificio.
	 * @return Observable con respuesta a la petición HTTP.
	 */
	getLaboratoriosPorEdificio( edificioAbreviatura: string ): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = `${ this.URL_LABORATORIOS }/edificio/${ edificioAbreviatura }?token=${ token }`;
			return this.http.get(url);
		}))
	}
	
	/**
	 * Petición HTTP GET para buscar laboratorios por su clave.
	 * 
	 * @param clave Clave del laboratorio.
	 * @return Observable con respuesta a la petición HTTP.
	 */
	getLaboratorioPorClave( clave: string ): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = `${ this.URL_LABORATORIOS }/${ clave }?token=${ token }`;
			return this.http.get(url);
		}))
	}
	
	/**
	 * Petición HTTP POST para crear laboratorio.
	 * 
	 * @param laboratorio LaboratorioModel con los datos del laboratorio.
	 * @return Observable con respuesta a la petición HTTP.
	 */
	addLaboratorio( laboratorio: LaboratorioModel ): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = `${ this.URL_LABORATORIOS }?token=${ token }`;
			return this.http.post(url, {laboratorio} );
		}))
	}
	
	/**
	 * Petición HTTP PUT para modificar laboratorio.
	 * 
	 * @param laboratorio LaboratorioModel con los datos del laboratorio.
	 * @return Observable con respuesta a la petición HTTP.
	 */
	updateLaboratorio( laboratorio: LaboratorioModel ): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = `${this.URL_LABORATORIOS}?token=${ token }`;
			return this.http.put(url, {laboratorio});
		}))
	}
	
	/**
	 * Petición HTTP DELETE para eliminar laboratorio por su clave.
	 * 
	 * @param clave Clave del laboratorio que se desea eliminar.
	 * @return Observable con respuesta a la petición HTTP.
	 */
	deleteLaboratorio( clave: string ): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = `${this.URL_LABORATORIOS}/${ clave }?token=${ token }`;
			return this.http.delete(url);
		}))
	}
	
	
	updateHorasDisponibles( id: string, horasDisponibles: HorasDisponiblesInterface ): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = `${this.URL_LABORATORIOS}/horasDisponibles?token=${ token }`;
			return this.http.put(url, { id, horasDisponibles });
		}))
	}
	
}
