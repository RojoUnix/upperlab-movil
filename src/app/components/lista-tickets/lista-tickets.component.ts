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

	constructor( private authService: AuthService, private router: Router, private ticketService: TicketsService ) { }
	ngOnInit() {		
		this.consultarTickets();
		if(this.authService.rol == ROLES.ALUMNO || this.authService.rol == ROLES.PROFESOR){
			this.esAlumno = true;
		}else{
			this.esAlumno = false;
		}
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

	cerrarSesion(){
		this.router.navigate(['login']);
	}s
}
