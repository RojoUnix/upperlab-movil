import { Component, AfterViewInit, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MensajeInterface, TicketModel, UsuarioInterface } from '../../models/ticket.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from '../../services/tickets.service';
import { MATRICULA_WOLFBOT } from '../../config/config';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy  {	
	@ViewChild('contenedor', { static: false }) contenedor: any;

  	chat: MensajeInterface[] = [];
	// tslint:disable-next-line: typedef
	objectKeys = Object.keys;
	// public ticketForm: FormGroup;
	mensajeForm: FormGroup;
	mensaje: FormControl;
	ticketSeleccionado: TicketModel;
	ticketsDelUsuario: TicketModel[] = [];
	matricula: string;
	idTicket: string;
	// chatContainer: ChatContainerComponent;
	getMessagesSub: Subscription;
	reconnectSub: Subscription;
	esSuperadmin: boolean;
	esAdmin: boolean;
	esAlumno: boolean;
	esProfesor: boolean;
	tickets: TicketModel[] = [];
	usuarios: UsuarioInterface[] = [];
	usuarioSeleccionado: UsuarioInterface;
	// matriculaDeUsuario: any;
	
	formularioEnviado$: Subject<boolean> = new Subject();
	
	constructor( public ticketsService: TicketsService, public authService: AuthService, public chatService: ChatService, public activatedRoute: ActivatedRoute ) { }
	
	async ngOnInit() {

		this.idTicket = this.activatedRoute.snapshot.paramMap.get('idTicket');
		this.matricula = this.authService.usuario.email.split('@')[0].toUpperCase();
		console.log('LA MATRICULA ES:', this.matricula);

		this.mensajeForm = new FormGroup({
			mensaje: new FormControl()
		});

		if ( this.authService.isAlumno() && !this.authService.alumno ) {
			try {
				await this.authService.consultarDatosUsuario();
			} catch ( e ) { }
		}


		console.log('keys length');
		console.log(Object.keys(this.chatService.ticketsMaster).length);

		if ( Object.keys(this.chatService.ticketsMaster).length === 0 ) {
			if ( this.authService.isAdmin() ) {
				this.getTicketsAdmin();
			} else if ( this.authService.isAlumno() ) {
				this.getTicketsMatricula();
			}
		} else {
			this.entrarASalasDeTickets();
			this.mostrarMensajes();
		}
		

		
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
			}
		});
	}
	
	mostrarMensajes(): void {
		console.log('Mostrando mensajes...');
		console.log('idTicket', this.idTicket);
		this.ticketSeleccionado = this.chatService.ticketsMaster[this.idTicket];
		console.log('ticketSeleccionado', this.ticketSeleccionado);
		this.ticketSeleccionado.chat.forEach( mensaje => {
			this.chat.push( mensaje);
		});
	}

	enviarMensaje() {
		console.log('FUNCION ENVIAR MENSAJE');
		console.log('Enviando mensaje...');
		
		const mensaje: MensajeInterface = {
			matricula: this.matricula,
			nombre: this.authService.usuario.displayName,
			mensaje: this.mensajeForm.get('mensaje').value,
			timestamp: Date.now().toString(),
			img: '',
			sala: this.ticketSeleccionado.id
		};
		
		if ( mensaje.mensaje !== null ) {
			console.log(mensaje);
			this.chatService.sendMessage( mensaje );
			// this.chat.push( mensaje );
			this.agregarMensajeUI( mensaje );
		} else {
			console.log('NO hay mensaje');
		}
		this.mensajeForm.reset();
	}

	
	agregarMensajeUI( message: MensajeInterface ) {
		this.chatService.ticketsMaster[message.sala].chat.push( message );
		
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
	}

	ngOnDestroy() {
		if ( this.getMessagesSub ) {
			this.getMessagesSub.unsubscribe();
		}
		if ( this.reconnectSub ) {
			this.reconnectSub.unsubscribe();
		}
	}
}
