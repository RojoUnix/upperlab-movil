import { Component, OnInit, Input } from '@angular/core';
import { TicketModel } from '../../models/ticket.model';
import { ChatService } from '../../services/chat.service';
import { sameDay } from '../../utils/utils';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit  {	
	

	@Input() ticketSeleccionado: TicketModel;
	@Input() matricula: string;
	
	constructor( public chatService: ChatService ) { }
	
	ngOnInit() {}

	/**
	 * Saber si el mensaje anterior es del mismo propietario.
	 * 
	 * @param pos Posición del mensaje en el arreglo del chat.
	 */
	mensajeAnterior( pos: number) {
		const matriculaA = this.chatService.ticketsMaster[ this.ticketSeleccionado.id ].chat[pos].matricula;
		const mensajeAnterior = this.chatService.ticketsMaster[ this.ticketSeleccionado.id ].chat[pos - 1];
		let matriculaB = null;
		if ( mensajeAnterior ) {
			matriculaB = mensajeAnterior.matricula;
		}
		return matriculaA === matriculaB;
	}


	/**
	 * Saber si el siguiente mensaje es del mismo propietario.
	 * 
	 * @param pos Posición del mensaje en el arreglo del chat.
	 */
	siguienteMensaje( pos: number) {
		const matriculaA = this.chatService.ticketsMaster[ this.ticketSeleccionado.id ].chat[pos].matricula;
		const siguienteMensaje = this.chatService.ticketsMaster[ this.ticketSeleccionado.id ].chat[pos + 1];
		let matriculaB = null;
		if ( siguienteMensaje ) {
			matriculaB = siguienteMensaje.matricula;
		}
		return matriculaA === matriculaB;
	}

	/**
	 * Saber si el siguiente mensaje es del mismo día.
	 * 
	 * @param pos Posición del mensaje en el arreglo del chat.
	 */
	siguienteFecha( pos: number ) {
		
		const fechaA = new Date(this.chatService.ticketsMaster[ this.ticketSeleccionado.id ].chat[pos].timestamp);
		const siguienteMensaje = this.chatService.ticketsMaster[ this.ticketSeleccionado.id ].chat[pos + 1];
		
		let fechaB = null;
		if ( siguienteMensaje ) {
			fechaB = new Date( siguienteMensaje.timestamp );
		}

		const resultado = sameDay( fechaA, fechaB );

		return resultado ? null : fechaB;
	}

	
}
