import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { AuthService } from '../../services/auth.service';
import { TicketModel } from '../../models/ticket.model';
import { ROLES, ESTADOS_TICKET } from '../../config/config';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';
import { ClasificacionesService } from '../../services/clasificaciones.service';
import { Clasificaciones } from '../../shared/interfaces/interfaces';

@Component({
	selector: 'app-lista-tickets',
	templateUrl: './lista-tickets.component.html',
	styleUrls: ['./lista-tickets.component.scss'],
})
export class ListaTicketsComponent implements OnInit {
	esAdmin: boolean;
	esAlumno: boolean;
	esProfesor: boolean;
	
	clasificacionesMaster: Clasificaciones;
	
	// tslint:disable-next-line: typedef
	objectKeys = Object.keys;
	tickets: TicketModel[] = [];
	
	constructor( public authService: AuthService, public clasificacionesService: ClasificacionesService, public ticketService: TicketsService, public chatService: ChatService, public router: Router ) { }
	ngOnInit() {		
		console.log('LISTA DE TICKETS');
		console.log('USUARIO: ', this.authService.usuario.displayName);
		console.log('MATRICULA: ', this.authService.usuario.email.split('@')[0]);
		
		this.consultarClasificaciones();
		
		if ( this.authService.isAlumno() ) {
			// Consultando tickets para Alumno o Profesor
			console.log('Entro Alumno');
			this.esAlumno = true;
			this.getTicketsMatricula();
			
		} else if ( this.authService.isProfesor() ) {
			// Consultando tickets para Alumno o Profesor
			console.log('Entro Profesor');
			this.esProfesor = true;
			this.getTicketsMatricula();
		} else if ( this.authService.isAdmin() ) {
			// Consultando tickets para Administrador (Todos los tickets)
			this.esAdmin = true;
			this.getTicketsAdmin();
			console.log('Entro Administrador');
		}
		console.log('Ticket master: ', this.chatService.ticketsMaster);
	}
	
	getTicketsMatricula() {
		this.ticketService.getTicketsPorMatricula( this.authService.usuario.email.split('@')[0] ).subscribe( respuesta => {
			if ( respuesta.ok ) {
				const ticketHolder: TicketModel[] = respuesta.tickets;
				ticketHolder.forEach( ticket => {
					this.chatService.ticketsMaster[ticket.id] = new TicketModel (ticket);
					this.tickets.push( new TicketModel(ticket) );
				});
			}
		});
	}
	
	
	consultarClasificaciones() {
		this.clasificacionesService.getClasificaciones().subscribe( respuesta => {
			console.log('Respuesta');
			console.log(respuesta);
			this.clasificacionesMaster = respuesta.clasificaciones;
			
			
			if ( !this.clasificacionesMaster.urgencias  || !this.clasificacionesMaster.urgencias.items ) {
				this.clasificacionesMaster.urgencias = { items: [], idDisponible: 1};
			}
			
			if ( !this.clasificacionesMaster.tipos || !this.clasificacionesMaster.tipos.items ) {
				this.clasificacionesMaster.tipos = { items: [], idDisponible: 1};
			}
			
			if ( !this.clasificacionesMaster.comunes || !this.clasificacionesMaster.comunes.items ) {
				this.clasificacionesMaster.comunes = { items: [], idDisponible: 1}; 
			}
			
			// this.pasarClasificacionesAOpciones();
		});
	}
	
	
	getTicketsAdmin() {
		this.ticketService.getTickets().subscribe(respuesta => {
			console.log('respuesta');
			console.log(respuesta);
			if ( respuesta.ok ) {
				const ticketHolder: TicketModel[] = respuesta.tickets;
				ticketHolder.forEach( ticket => {
					this.chatService.ticketsMaster[ticket.id] = new TicketModel(ticket);
					this.tickets.push( new TicketModel(ticket) );
				});
			}
		});
	}
	
	verRutaAdmin( id ) {
		console.log('ENTRA A LA FUNCIÓN PARA VER LA RUTA ADMINISTRADOR');
		console.log('admin/tickets/conversacion', this.chatService.ticketsMaster[id].id);
		this.router.navigate(['admin/tickets/conversacion', this.chatService.ticketsMaster[id].id]);
	}
	
	verRutaAlumno( id ) {
		console.log('ENTRA A LA FUNCIÓN PARA VER LA RUTA ALUMNO');
		console.log(this.router.url + '/conversacion/' + this.chatService.ticketsMaster[id].id);
		// this.router.navigate([this.router.url + '/conversacion/' + this.chatService.ticketsMaster[id].id]);
	}
	
	
	ticketNuevo( pos: number ) {
		if ( this.tickets.length > 0 ) {
			return this.tickets[ pos ].estado === ESTADOS_TICKET.NUEVO;
		}
		return false;
	}
	
	ticketEnProceso( pos: number ) {
		if ( this.tickets.length > 0 ) {
			return this.tickets[ pos ].estado === ESTADOS_TICKET.EN_PROCESO;
		}
		return false;
	}
	
	ticketResuelto( pos: number ) {
		if ( this.tickets.length > 0 ) {
			return this.tickets[ pos ].estado === ESTADOS_TICKET.RESUELTO;
		}
		return false;
	}
	
	ticketNoResuelto( pos: number ) {
		if ( this.tickets.length > 0 ) {
			return this.tickets[ pos ].estado === ESTADOS_TICKET.NO_RESUELTO;
		}
		return false;
	}
	
	ticketCancelado( pos: number ) {
		if ( this.tickets.length > 0 ) {
			return this.tickets[ pos ].estado === ESTADOS_TICKET.CANCELADO;
		}
		return false;
	}
	
}
