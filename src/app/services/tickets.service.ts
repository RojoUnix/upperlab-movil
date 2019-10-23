import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { TicketModel } from '../models/ticket.model';
import { MATRICULA_WOLFBOT } from '../config/config';
import { URL_SERVICIOS } from 'src/environments/environment';
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
	

	getTicketsPorMatricula( matricula: string ): Observable<any> {
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

	// updat1eChat( ticket: TicketModel ): Observable<any> {
	// 	const token = this.storage.get('token');
	// 	const url = this.URL_TICKETS + `/${ ticket.id }/chat?token=${ token }`;

	// 	// Quitar los mensajes que son del Bot.
	// 	const ticketAux = new TicketModel( ticket );

		
	// 	ticketAux.chat = ticketAux.chat.filter( mensaje => mensaje.matricula !== MATRICULA_WOLFBOT );
		
	// 	return this.http.put(url, { ticket: ticketAux });
	// }

	updateChat( ticket: TicketModel ): Observable<any> {
		const ticketAux = new TicketModel( ticket );
		return from(this.storage.get('token')).pipe(mergeMap( token =>{
			const url = this.URL_TICKETS + `/${ ticket.id }/chat?token=${ token }`;
			ticketAux.chat = ticketAux.chat.filter( mensaje => mensaje.matricula !== MATRICULA_WOLFBOT );
			return this.http.put(url, { ticket: ticketAux});
		}));
	}
}
