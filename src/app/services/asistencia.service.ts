import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../environments/environment';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AlumnoModel } from '../models/alumno.model';

@Injectable({
	providedIn: 'root'
})
export class AsistenciaService {
	private URL_ASISTENCIA: string = URL_SERVICIOS + '/asistencia';
	
	constructor( private  http: HttpClient, private storage: Storage ) { }
	
	registrarAsistencia( alumno: AlumnoModel, encrypted: string ): Observable<any> {
		console.log( encrypted );
		return from( this.storage.get('token') ).pipe( mergeMap ( token => {
			const url = `${this.URL_ASISTENCIA}?token=${ token }`;
			return this.http.post(url, { alumno, encrypted }, {});
		}))
	}

}
