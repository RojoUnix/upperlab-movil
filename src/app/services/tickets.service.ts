import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { URL_SERVICIOS } from './../config/config';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  	private URL_TICKETS: string = URL_SERVICIOS + '/ticket';
	data: Observable<any>;  
	  
	constructor( private http: HttpClient, private storage: Storage ) { }
	
	getTickets(): Observable<any>{
		return from(this.storage.get('token')).pipe( mergeMap (token =>{
			const url = this.URL_TICKETS + `/?token=${ token }`;
			return this.http.get(url);
		}))
	}

	getTicketsDeAlumno( matricula: string ): Observable<any> {
		return from( this.storage.get('token') ).pipe( mergeMap ( token => {
			const url = this.URL_TICKETS + `/${ matricula }?token=${ token }`;
			return this.http.get(url);
		}));
	}	

	addTicket( ticket ): Observable <any> {
		console.log('En el Servicio del Ticket');
		console.log('Ticket ', ticket);
		return from( this.storage.get('token') ).pipe( mergeMap ( token => {
			const url = this.URL_TICKETS + `?token=${ token }`;
			return this.http.post(url, {ticket});
		}));
	}
	
}
