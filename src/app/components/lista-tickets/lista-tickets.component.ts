import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { AuthService } from '../../services/auth.service';
import { TicketModel } from '../../models/ticket.model';
import { ESTADOS_TICKET } from '../../config/config';
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
	
	cargando: boolean = true;
	esAdmin: boolean;
	
	clasificacionesMaster: Clasificaciones;
	
	// tslint:disable-next-line: typedef
	objectKeys = Object.keys;
	tickets: TicketModel[] = [];
	
	constructor( public authService: AuthService, public clasificacionesService: ClasificacionesService, public ticketService: TicketsService, public chatService: ChatService, public router: Router ) {}

	ngOnInit() {
		
		this.consultarClasificaciones();
		
		if ( this.authService.isAlumno() || this.authService.isProfesor() ) {
			// Consultando tickets para Alumno o Profesor
			this.getTicketsMatricula();
			
		} else if ( this.authService.isAdmin() ) {
			// Consultando tickets para Administrador (Todos los tickets)
			this.esAdmin = true;
			this.getTicketsAdmin();
		}
	}
	
	getTicketsMatricula() {
		this.cargando = true;
		this.ticketService.getTicketsPorMatricula( this.authService.usuario.email.split('@')[0] ).subscribe( respuesta => {
			if ( respuesta.ok ) {
				const ticketHolder: TicketModel[] = respuesta.tickets;
				ticketHolder.forEach( ticket => {
					this.chatService.ticketsMaster[ticket.id] = new TicketModel (ticket);
					this.tickets.push( new TicketModel(ticket) );
				});
				this.cargando = false;
			}
		});
	}
	
	
	consultarClasificaciones() {
		this.clasificacionesService.getClasificaciones().subscribe( respuesta => {
			
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
			
		});
	}
	
	
	getTicketsAdmin() {
		this.cargando = true;
		this.ticketService.getTickets().subscribe(respuesta => {
			
			if ( respuesta.ok ) {

				const ticketHolder: TicketModel[] = respuesta.tickets;
				ticketHolder.forEach( ticket => {
					this.chatService.ticketsMaster[ticket.id] = new TicketModel(ticket);
					this.tickets.push( new TicketModel(ticket) );
				});
				this.cargando = false;
			}
		});
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
