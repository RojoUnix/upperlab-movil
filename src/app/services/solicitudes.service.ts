import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { URL_SERVICIOS } from '../../environments/environment';
import { SolicitudModel } from '../models/solicitud.model';
import { Storage } from '@ionic/storage';
import { mergeMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class SolicitudesService {
	
	URL_SOLICITUDES: string = URL_SERVICIOS + '/solicitudes';
	
	constructor( private http: HttpClient, private storage: Storage ) { }

	getSolicitudes(): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = `${ this.URL_SOLICITUDES }?token=${ token }`;
			return this.http.get(url);
		}))
	}
	
	getSolicitudesPorMatricula( matricula: string ): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = `${ this.URL_SOLICITUDES }/${matricula}?token=${ token }`;
			return this.http.get(url);
		}))
	}
	
	addSolicitud( solicitud: SolicitudModel ): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = `${ this.URL_SOLICITUDES }?token=${ token }`;
			return this.http.post(url, { solicitud });
		}))
	}
	
	cambiarEstado( id: string, estado: number ): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = this.URL_SOLICITUDES + `/estado/${ id }?token=${ token }`;
			return this.http.put(url, { estado });
		}))
	}
	
}
