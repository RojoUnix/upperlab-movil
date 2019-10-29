import { Storage } from '@ionic/storage';
import { URL_SERVICIOS } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ProfesorService {
	
	URL_PROFESOR: string = URL_SERVICIOS + '/profesor';

	constructor( public http: HttpClient, private storage: Storage ) { }

	getProfesorPorMatricula( matricula: string ): Observable<any> {
		
		return from( this.storage.get('token') ).pipe( mergeMap (token => {
			const url = this.URL_PROFESOR + `/${ matricula }?token=${ token }`;
			return this.http.get(url);
		}));
	}

}
