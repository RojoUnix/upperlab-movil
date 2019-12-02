import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MensajeInterface, TicketModel } from '../../models/ticket.model';
import { Subscription } from 'rxjs';
import { TicketsService } from '../../services/tickets.service';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { MATRICULA_WOLFBOT } from '../../config/config';
import { IonContent } from '@ionic/angular';
import { MenuService } from '../../services/menu.service';

@Component({
	selector: 'app-conversacion',
	templateUrl: './conversacion.page.html',
	styleUrls: ['./conversacion.page.scss'],
})
export class ConversacionPage implements OnInit, OnDestroy {

	@ViewChild('content', {static: true}) private content: IonContent;
	
  	chat: MensajeInterface[] = [];

	mensaje: string;
	ticketSeleccionado: TicketModel;
	matricula: string;
	idTicket: string;
	getMessagesSub: Subscription;

	
	constructor( public ticketsService: TicketsService, public authService: AuthService, public chatService: ChatService, public activatedRoute: ActivatedRoute, private menuService: MenuService ) { }
	
	async ngOnInit() {

		this.idTicket = this.activatedRoute.snapshot.paramMap.get('idTicket');
		this.matricula = this.authService.usuario.email.split('@')[0].toUpperCase();
		console.log('LA MATRICULA ES:', this.matricula);

		if ( this.authService.isAlumno() && !this.authService.alumno ) {
			try { 
				await this.authService.consultarDatosUsuario();
			} catch ( e ) {
				
			}
		}


		console.log('keys length');
		console.log(Object.keys(this.chatService.ticketsMaster).length);
		console.log(this.chatService.ticketsMaster);

		if ( Object.keys(this.chatService.ticketsMaster).length === 0 ) {
			if ( this.authService.isAdmin() ) {
				this.getTicketsAdmin();
			} else if ( this.authService.isAlumno() ) {
				this.getTicketsMatricula();
			}
		} else {
			this.entrarASalasDeTickets();
			this.mostrarMensajes();
			this.scrollToBottom(0);
		}
	}

	ionViewWillLeave() {
		this.menuService.showMenu('second', false);
	}

	getTicketsMatricula() {
		console.log('Obteniendo tickets por matrícula');
		this.ticketsService.getTicketsPorMatricula( this.matricula ).subscribe( respuesta => {
			if ( respuesta.ok ) {
				const ticketHolder: TicketModel[] = respuesta.tickets;
				ticketHolder.forEach(ticket => {
					this.chatService.ticketsMaster[ticket.id] = new TicketModel (ticket);
				});
				this.entrarASalasDeTickets();
				this.mostrarMensajes();
				this.scrollToBottom(40);
			}
		});
	}

	getTicketsAdmin() {
		this.ticketsService.getTickets().subscribe(respuesta => {
			if ( respuesta.ok ) {
				const ticketHolder: TicketModel[] = respuesta.tickets;
				ticketHolder.forEach(ticket => {
					this.chatService.ticketsMaster[ticket.id] = new TicketModel(ticket);
				});
				
				this.entrarASalasDeTickets();
				// Ya están consultados, ya podemos mostrar los mensajes.
				this.mostrarMensajes();
				this.scrollToBottom(40);
			}
		});
	}

	scrollToBottom( ms: number ) {
		setTimeout( () => {
			this.content.scrollToBottom();
		}, ms);
	}
	
	mostrarMensajes(): void {
		this.ticketSeleccionado = this.chatService.ticketsMaster[this.idTicket];

		// Actualizar los detalles del ticket en el menu lateral derecho.
		this.menuService.updateTicket(this.ticketSeleccionado);
		// Habilitar el menú lateral derecho.
		this.menuService.showMenu('second', true);
	}

	enviarMensaje() {
		console.log('Enviando mensaje...');
		
		if ( this.mensaje.length > 0 ) {

			// HARDCODED LINES:
			let url: string;
			if ( this.authService.isAdmin() ) {
				url = 'assets/images/users/1.jpg';
			} else {
				url = 'assets/images/users/2.jpg';
			}
		
			const mensaje: MensajeInterface = {
				matricula: this.matricula,
				nombre: this.authService.usuario.displayName,
				mensaje: this.mensaje,
				timestamp: Date.now().toString(),
				img: url,
				sala: this.ticketSeleccionado.id
			};
			
			if ( mensaje.mensaje !== null ) {
				console.log(mensaje);
				this.chatService.sendMessage( mensaje );
				this.agregarMensajeUI( mensaje );
			} else {
				console.log('NO hay mensaje');
			}

			this.mensaje = '';
		}
	}

	
	agregarMensajeUI( message: MensajeInterface ) {
		this.chatService.ticketsMaster[message.sala].chat.push( message );

		this.scrollToBottom(40);
		
		console.log('Actualizando chat...');
		if ( message.matricula !== MATRICULA_WOLFBOT ) {
			
			this.ticketsService.updateChat( this.chatService.ticketsMaster[message.sala] ).subscribe( respuesta => {
				console.log(respuesta);
				
			}, err => {
				console.log(err);
			});
		}
	}
	
	getTicket( id: string ): TicketModel {
		for (const key in this.chatService.ticketsMaster) {
			if (this.chatService.ticketsMaster.hasOwnProperty(key)) {
				const ticket = this.chatService.ticketsMaster[key];
				if ( ticket.id === id ) {
					return ticket;
				}
			}
		}
		return null;
	}
	

	entrarASalasDeTickets() {
		// Conectarse al namespace de '/chat'
		this.chatService.connectToChat();

		const rooms: string[] = [];

		// Obtener los rooms que son los ID's de los tickets.
		Object.keys(this.chatService.ticketsMaster).forEach( id => {
			const ticket = this.chatService.ticketsMaster[id];
			rooms.push( ticket.id );
		});

		// Ingresar a las salas/rooms 
		this.chatService.joinChat( rooms );

		this.getMessagesSub = this.chatService.getMessages().subscribe( message => {
			console.log('Mensaje recibido: ');
			console.log(message);
			this.agregarMensaje(message);
		}, err => {
			console.log(err);
		});	
	}

	agregarMensaje( message: MensajeInterface ) {
		this.chatService.ticketsMaster[message.sala].chat.push( message );
		this.scrollToBottom(40);
	}

	ngOnDestroy() {
		if ( this.getMessagesSub ) {
			this.getMessagesSub.unsubscribe();
		}
	}
	
}
