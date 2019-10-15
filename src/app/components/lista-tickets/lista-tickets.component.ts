import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { AuthService } from '../../services/auth.service';
import { TicketModel } from '../../models/ticket.model';
import { ROLES } from '../../config/config';

@Component({
	selector: 'app-lista-tickets',
	templateUrl: './lista-tickets.component.html',
	styleUrls: ['./lista-tickets.component.scss'],
})
export class ListaTicketsComponent implements OnInit {
	esAlumno: boolean;
	tickets: TicketModel[] = [];

	constructor( public authService: AuthService, private router: Router, private ticketService: TicketsService ) { }
	ngOnInit() {		
		if(this.authService.rol == ROLES.ALUMNO || this.authService.rol == ROLES.PROFESOR){
			this.consultarTickets();
			this.esAlumno = true;
		}else{
			this.consultarTicketsAdmin();
			this.esAlumno = false;
		}
	}

	consultarTicketsAdmin(){
		this.ticketService.getTickets().subscribe(respuesta => {
			if(respuesta.ok){
				this.tickets = respuesta.tickets;
				this.tickets = this.tickets.map( ticket =>{
					return new TicketModel(ticket);
				});
			}
		}, err => {
			console.log(err);
			
		});
	}


	consultarTickets(){
		this.ticketService.getTicketsDeAlumno( this.authService.usuario.email.split('@')[0] ).subscribe( respuesta => {
			console.log(respuesta.tickets);
			
			if ( respuesta.ok ) {
				this.tickets = respuesta.tickets;
				this.tickets = this.tickets.map( ticket => {
					return new TicketModel( ticket );
				});
			}
		}, err => {
			console.log(err);
		});
	}
}
