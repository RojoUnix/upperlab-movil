import { MensajeInterface } from './../../../../models/ticket.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TicketModel, UsuarioInterface } from '../../../../models/ticket.model';
import { Subscription, Subject } from 'rxjs';
import { TicketsService } from '../../../../services/tickets.service';
import { AuthService } from '../../../../services/auth.service';
import { ChatService } from '../../../../services/chat.service';
import { MATRICULA_WOLFBOT } from '../../../../config/config';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-conversacion',
	templateUrl: './conversacion.page.html',
	styleUrls: ['./conversacion.page.scss'],
})
export class ConversacionPage implements OnInit {
	
	chat: MensajeInterface[] = [];
	objectKeys = Object.keys;
	public ticketForm: FormGroup;
	public mensajeForm: FormGroup;
	public mensaje: FormControl;
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
	matriculaDeUsuario: any;
	
	formularioEnviado$: Subject<boolean> = new Subject();
	
	constructor( public ticketsService: TicketsService, public authService: AuthService, public chatService: ChatService, public activatedRoute: ActivatedRoute ) { }
	
	async ngOnInit() {
		
		this.matricula = this.authService.usuario.email.split('@')[0].toUpperCase();
		this.ticketForm = new FormGroup({
			ticket: new FormControl('', Validators.required)
		});
		
		this.mensajeForm = new FormGroup({
			mensaje: new FormControl()
		});

		
		if ( Object.keys(this.chatService.ticketsMaster).length === 0 ) {
			// No existen los ticketsMaster, hay que consultarlos
			this.getTicketsAdmin();
		} else {
			this.entrarASalasDeTickets();
			// Ya existen los ticketsMaster
			this.mostrarMensajes();
		}
		
		console.log('LA MATRICULA ES:', this.matricula);
		this.idTicket= this.activatedRoute.snapshot.paramMap.get('idTicket');
	}
	
	ngAfterViewInit(): void {
		// this.scrollBottom(true);
	}

	getTicketsAdmin(){
		this.ticketsService.getTickets().subscribe(respuesta => {
			if(respuesta.ok){
				const ticketHolder: TicketModel[] = respuesta.tickets;
				ticketHolder.forEach(ticket =>{
					this.chatService.ticketsMaster[ticket.id] = new TicketModel (ticket);
				});
				
				this.entrarASalasDeTickets();
				// Ya están consultados, ya podemos mostrar los mensajes.
				this.mostrarMensajes();
			}
		});
	}
	
	mostrarMensajes(): void {
		console.log('Mostrando mensajes...');
		this.ticketSeleccionado = this.chatService.ticketsMaster[this.idTicket];
		
		this.ticketSeleccionado.chat.forEach( mensaje => {
			this.chat.push( mensaje);
		});
	}
	
	enviarMensaje(){
		console.log('FUNCION ENVIAR MENSAJE');
		console.log('Enviando mensaje...');
		
		// HARDCODED LINES:
		// let url: string;
		// if ( this.authService.isAdmin() ) {
		// 	url = 'assets/images/users/1.jpg';
		// } else {
		// 	url = 'assets/images/users/2.jpg';
		// }
		
		const mensaje: MensajeInterface = {
			matricula: this.matricula,
			nombre: this.authService.usuario.displayName,
			mensaje: this.mensajeForm.get('mensaje').value,
			timestamp: Date.now().toString(),
			img: '',
			sala: this.ticketSeleccionado.id
		};
		
		console.log(mensaje);
		
		this.chatService.sendMessage( mensaje );
		// this.chat.push( mensaje );
		// this.agregarMensajeUI( mensaje );
		
		this.mensajeForm.reset();
	}
	
	// agregarMensajeUI( message: MensajeInterface ) {
	// 	this.chatService.ticketsMaster[message.sala].chat.push( message );
		
	// 	console.log('Actualizando chat...');
	// 	if ( message.matricula !== MATRICULA_WOLFBOT ) {
			
	// 		this.ticketsService.updateChat( this.chatService.ticketsMaster[message.sala] ).subscribe( respuesta => {
	// 			console.log(respuesta);
	// 		}, err => {
	// 			console.log(err);
	// 		});
	// 	}
	// }
	
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
	
	actualizarUIAdmin( usuarioPrevio: UsuarioInterface, usuarioSeleccionado: UsuarioInterface, ticketsDelUsuario: TicketModel[] ): boolean {
		
		if ( !usuarioPrevio || usuarioPrevio.matricula !== usuarioSeleccionado.matricula ) {
			
			this.ticketsDelUsuario = ticketsDelUsuario;
			usuarioPrevio = usuarioSeleccionado;
			
			// this.generarOpcionesDeTickets();
			
			// Cambiar opción del select al primer ticket[0].
			// if ( this.ticketsOpciones.length > 0 ) {
			// 	this.ticketForm.get('ticket').setValue( this.ticketsOpciones[0].value );
			// 	this.ticketSeleccionado = ticketsDelUsuario[0];
			
			// }
			
			this.mostrarMensajes();
			
			return true;
			
		}
		
		return false;
	}
	
	actualizarUIUsuario( ticket: TicketModel ) {
		if ( !this.ticketSeleccionado || ticket.id !== this.ticketSeleccionado.id ) {
			
			this.ticketSeleccionado = ticket;
			// this.chat = ticket.chat || [];
			this.mostrarMensajes();
		}
	}
	
	resetearForm() {
		this.ticketForm.reset({
			ticket: ''
		});
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
	
	
	cambiarChatContainerUI( event: {usuario: UsuarioInterface, ticket: TicketModel} ) {
		const usuario = event.usuario;
		const ticket = event.ticket;
		
		console.log('Cambiando chat UI...');
		
		if ( ticket ) {
			
			console.log('Es una instancia de Ticket');
			this.actualizarUIUsuario( ticket );
			
		} else {
			
			console.log('Es una Interfaz de Usuario');
			const guardarUsuario = this.actualizarUIAdmin( this.usuarioSeleccionado, usuario, this.sacarTicketsDelUsuario( usuario ));
			if ( guardarUsuario ) {
				this.usuarioSeleccionado = usuario;
			}
		}
	}
	
	
	sacarTicketsDelUsuario( usuario: UsuarioInterface ): TicketModel[] {
		const ticketsDelUsuario: TicketModel[] = [];
		
		Object.keys(this.chatService.ticketsMaster).forEach( id => {
			const ticket = this.chatService.ticketsMaster[id];
			if ( ticket.usuario.matricula === usuario.matricula ) {
				ticketsDelUsuario.push( ticket );
			}
		});
		
		// for (const ticket of this.tickets ) {
		// 	if ( ticket.usuario.matricula === usuario.matricula ) {
		// 		ticketsDelUsuario.push( ticket );
		// 	}
		// }
		return ticketsDelUsuario;
	}
	
	
	usuarioRepetido( usuarioNuevo: UsuarioInterface ): boolean {
		let vecesRepetido = 0;
		
		for (const usuario of this.usuarios ) {
			if ( usuario.matricula === usuarioNuevo.matricula ) {
				vecesRepetido++;
			}
		}
		if ( vecesRepetido > 0 ) {
			return true;
		}
		return false;
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
