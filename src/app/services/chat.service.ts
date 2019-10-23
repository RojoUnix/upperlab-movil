import * as io from 'socket.io-client';
import { MensajeInterface } from './../models/ticket.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketModel } from '../models/ticket.model';
import { AuthService } from './auth.service';
import { URL_SERVICIOS } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ChatService {
	private url: string = URL_SERVICIOS;
	private socket: SocketIOClient.Socket;

	public ticketsMaster: {[key: string]: TicketModel} = {};
	idTicket: string;
	ticketSel: TicketModel;

	
	constructor( private authService: AuthService ) {
		// this.socket = io(this.url);
		// this.socket = io('/admin');
	}


	/**
	 * Meter al admin al namespace `/admin` que es como un grupo de admins.
	 */
	connectAdmin() {
		console.log('Conectando Admin');
		this.socket = io(`${ this.url }/admin`);
		this.guardarInfoCliente();
		this.reconnectEvent();
	}
	
	/**
	 * Meter al alumno/profesor al namespace `/usuario` que es como un grupo de
	 * usuarios. Los cuales son alumnos y profesores.
	 */
	connectUsuario() {
		console.log('Conectando Usuario');
		this.socket = io(`${ this.url }/usuario`);
		this.guardarInfoCliente();
		this.reconnectEvent();
	}
	
	/**
	 * Meter al usuario al namespace `/chat` que es como un grupo de usuarios.
	 * Los cuales son alumnos y profesores.
	 */
	connectToChat() {
		console.log('Conectando Usuario');
		this.socket = io(`${ this.url }/chat`);
	}

	/**
	 * Mete (o suscribe) al cliente a un grupo de salas. En este caso serán un
	 * grupo de strings que son los ID's de los tickets.
	 * 
	 * @param rooms Id's de las salas a las que se suscribirá el cliente.
	 */
	joinChat( rooms: string[] ) {
		console.log('INGRESANDO AL CHAT ' + this.authService.usuario.displayName);
		const data = {
			rooms,
			nombre: this.authService.usuario.displayName
		};
		this.guardarInfoCliente();
		this.socket.emit('join', data);
	}

		
	/**
	 * Evento para mandar un mensaje dentro del chat.
	 */
	sendMessage( mensaje: MensajeInterface ) {
		this.socket.emit('nuevoMensaje', mensaje);
	}
	

	getMessages(): Observable<MensajeInterface> {
		return new Observable((observer) => {
			this.socket.on('recibirMensaje', (message) => {
				observer.next(message);
			});
		});
	}

	/**
	 * Manda la información del cliente al servidor para que se guarde. Estos
	 * datos incluyen: la matrícula del cliente/usuario y su nombre. En el
	 * servidor se guardará en el objeto Clients incluyéndole el socket.id que
	 * se le generó a este cliente. Para después poder obtener a este cliente
	 * por medio de ese socket.id.
	 */
	guardarInfoCliente() {
		this.socket.emit('guardarInfoCliente', {
			matricula: this.authService.usuario.email.split('@')[0],
			nombre: this.authService.usuario.displayName,
			rol: this.authService.rol
		});
	}

	/**
	 * Evento para que, cuando pierda la conexión y se reconecte, se mande la
	 * información del cliente para que el servidor lo guarde cuando pierda la
	 * conexión y se reconecte.
	 */
	reconnectEvent() {
		return new Observable((observer) => {
			this.socket.on('reconnect', (attemptNumber) => {
				// this.guardarInfoCliente();
				observer.next();
			});
		});
	}
	
	/**
	 * Retorna el observable para escuchar las notificaciones cuando el usuario
	 * está fuera del chat.
	 */
	getNotificaciones(): Observable<any> {
		return new Observable((observer) => {
			this.socket.on('notificacion', (message) => {
				observer.next(message);
			});
		});
	}

	/**
	 * Envia una notificación a los que les corresponda. Esto significa que, si
	 * es un alumno, esta notificación se enviará al grupo/namespace de `/admin`
	 * donde están todos los administradores conectados. Si es un administrador
	 * esta notificación se enviará a los usuarios de X sala. La sala es el id
	 * del ticket donde el administrador envió un mensaje.
	 */
	// enviarNotificacion( data: NotificacionInterface ) {
	// 	this.socket.emit('notificacion', data );
	// }
}