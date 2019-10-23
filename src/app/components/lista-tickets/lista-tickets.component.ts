import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../../services/tickets.service';
import { AuthService } from '../../services/auth.service';
import { TicketModel } from '../../models/ticket.model';
import { ROLES } from '../../config/config';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-lista-tickets',
	templateUrl: './lista-tickets.component.html',
	styleUrls: ['./lista-tickets.component.scss'],
})
export class ListaTicketsComponent implements OnInit {
	esAdmin: boolean;
	esAlumno: boolean;
	esProfesor: boolean;
	// tslint:disable-next-line: typedef
	objectKeys = Object.keys;
	tickets: TicketModel[] = [];

	constructor( public authService: AuthService, public ticketService: TicketsService, public chatService:ChatService, public router: Router ) { }
	ngOnInit() {		
		console.log('LISTA DE TICKETS');
		console.log('USUARIO: ', this.authService.usuario.displayName);
		console.log('MATRICULA: ', this.authService.usuario.email.split('@')[0]);
		
		if(this.authService.rol == ROLES.ALUMNO){
			console.log('Entro Profesor');
			this.esProfesor= true;
			this.getTicketsMatricula();
			
		} else if(this.authService.rol == ROLES.PROFESOR){
			//Consultando tickets para Alumno o Profesor
			console.log('Entro Profesor');
			this.esAlumno = true;
			this.getTicketsMatricula();
		}else{
			// Consultando tickets para Administrador (Todos los tickets)
			this.esAdmin = true;
			this.getTicketsAdmin();
			console.log('Entro Administrador');
		}
		console.log('Ticket master: ', this.chatService.ticketsMaster);
	}
	
	getTicketsMatricula(){
		this.ticketService.getTicketsPorMatricula( this.authService.usuario.email.split('@')[0] ).subscribe( respuesta => {
			if(respuesta.ok){
				const ticketHolder: TicketModel[] = respuesta.tickets;
				ticketHolder.forEach(ticket =>{
					this.chatService.ticketsMaster[ticket.id] = new TicketModel (ticket);
				})
			}
		});
	}

	getTicketsAdmin(){
		this.ticketService.getTickets().subscribe(respuesta => {
			if(respuesta.ok){
				const ticketHolder: TicketModel[] = respuesta.tickets;
				ticketHolder.forEach(ticket =>{
					this.chatService.ticketsMaster[ticket.id] = new TicketModel (ticket);
				})
			}
		});
	}

	verRutaAdmin(id){
		console.log('ENTRA A LA FUNCIÓN PARA VER LA RUTA ADMINISTRADOR');
		console.log('admin/tickets/conversacion',this.chatService.ticketsMaster[id].id);
		this.router.navigate(['admin/tickets/conversacion',this.chatService.ticketsMaster[id].id]);
	}
	verRutaAlumno(id){
		console.log('ENTRA A LA FUNCIÓN PARA VER LA RUTA ALUMNO');
		console.log(this.router.url + '/conversacion/' + this.chatService.ticketsMaster[id].id);
		// this.router.navigate([this.router.url + '/conversacion/' + this.chatService.ticketsMaster[id].id]);
	}

}
