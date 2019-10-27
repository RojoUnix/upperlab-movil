import { Clasificaciones } from '../shared/interfaces/interfaces';
import { URL_SERVICIOS } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { mergeMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ClasificacionesService {

	URL_CLASIFICACIONES: string = URL_SERVICIOS + '/clasificaciones';

	clasificacionesMaster: Clasificaciones;
	clasificacionesEstadoAnterior: Clasificaciones;
	
	constructor( private http: HttpClient, private storage: Storage ) { }

	getClasificaciones(): Observable<any> {
		return from(this.storage.get('token')).pipe( mergeMap (token => {
			const url = `${ this.URL_CLASIFICACIONES }?token=${ token }`;
			return this.http.get( url );
		}));

	}
	
	updateClasificaciones(): Observable<any> {
		return from(this.storage.get('token')).pipe ( mergeMap ( token =>{
			const url = `${ this.URL_CLASIFICACIONES }?token=${ token }`;
			return this.http.put( url, { clasificaciones: this.clasificacionesMaster });
		}));
	}


	updateTipoDeClasificacion( tipo: string ): Observable<any> {
		return from(this.storage.get('token')).pipe(mergeMap ( token => {
			console.log('Tipo: ' + tipo);
			const url = `${ this.URL_CLASIFICACIONES }/tipo/${ tipo }?token=${ token }`;
			return this.http.put( url, { document: this.clasificacionesMaster[tipo] });
		}));
	}


	guardarEstado() {
		console.log('Guardando estado...');
		this.clasificacionesEstadoAnterior = JSON.parse( JSON.stringify(this.clasificacionesMaster) );
	}

	ctrlZ() {
		console.log('Ctrl + Z');
		this.clasificacionesMaster = JSON.parse( JSON.stringify(this.clasificacionesEstadoAnterior) );
	}
}
