import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tickets',
	templateUrl: './tickets.page.html',
	styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
	
	// tickets: TicketModel[] = [];
	
	
	// constructor( private authServicio: AuthService, private router: Router, private ticketService: TicketsService ) { }
	ngOnInit() {		
		
	// 	this.consultarTickets();
		
	}

	
	// consultarTickets(){
	// 	this.ticketService.getTicketsDeAlumno( this.authServicio.usuario.email.split('@')[0] ).subscribe( respuesta => {
	// 		if ( respuesta.ok ) {
	// 			this.tickets = respuesta.tickets;
	// 			this.tickets = this.tickets.map( ticket => {
	// 				return new TicketModel( ticket );
	// 			});
	// 		}
	// 	}, err => {
	// 		console.log(err);
	// 	});
	// }


	// cerrarSesion(){
	// 	this.router.navigate(['login']);
	// }
	
}
