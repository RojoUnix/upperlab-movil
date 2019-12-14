import { Component, OnInit } from '@angular/core';
import { TicketModel } from '../../models/ticket.model';
import { MenuService } from '../../services/menu.service';

@Component({
	selector: 'app-menu-detalles',
	templateUrl: './menu-detalles.component.html',
	styleUrls: ['./menu-detalles.component.scss'],
})
export class MenuDetallesComponent implements OnInit {
	
	ticket: TicketModel;
	
	constructor( private menuService: MenuService ) { }
	
	ngOnInit() {
		this.menuService.getUpdateTicketEmitter().subscribe( ( ticket: TicketModel ) => {
			console.log('Actualizando ticket...');
			console.log(ticket);
			this.ticket = ticket;
		});
	}
	
}
