import { Injectable, EventEmitter } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TicketModel } from '../models/ticket.model';

@Injectable({
	providedIn: 'root'
})
export class MenuService {
	
	private updateMenuEmitter: EventEmitter<void> = new EventEmitter();
	private updateTicketEmitter: EventEmitter<TicketModel> = new EventEmitter();
	
	constructor( private menuCtrl: MenuController ) { }
	
	/**
	 * Mandarle al menú una notificación para que actualice sus datos.
	 */
	updateMenu() {
		this.updateMenuEmitter.emit();
	}

	/**
	 * Actualizar la información de los detalles del ticket para el menu del
	 * chat donde se detalla el ticket.
	 */
	updateTicket( ticket: TicketModel ) {
		this.updateTicketEmitter.emit(ticket);
	}

	/**
	 * Devuelve el Emitter del Menu 'first', lateral izquierdo.
	 */
	getUpdateMenuEmitter(): EventEmitter<void> {
		return this.updateMenuEmitter;
	}

	/**
	 * Devuelve el Emitter del Menu 'second', lateral derecho, que se muestra
	 * en el chat y detallar el ticket del que se está hablando.
	 */
	getUpdateTicketEmitter(): EventEmitter<TicketModel> {
		return this.updateTicketEmitter;
	}


	/**
	 * Habilita o deshabilita el menu.
	 * 
	 * @param show Valor booleano para saber si se quiere mostrar o no.
	 */
	showMenu( menuId: string, show: boolean ) {
		this.menuCtrl.enable(show, menuId);
	}

}
