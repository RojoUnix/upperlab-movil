import { Component, OnInit } from '@angular/core';
import { FcmService } from '../../services/fcm.service';
import { ToastController, AlertController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-tickets',
	templateUrl: './tickets.page.html',
	styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
	
	constructor( private fcm: FcmService, private toastCtrl: ToastController, private alertCtrl: AlertController ) {}
	
	ngOnInit() {
		this.fcm.getToken();
		
		this.fcm.listenToNotifications().pipe( tap( msg => {
			console.log('Listened to Notification...');
			this.presentToast( msg ).then( () => {} );
		}));
	}

	async presentToast( msg: any ) {
		const toast = await this.toastCtrl.create({
			message: msg.body,
			duration: 2000
		});
		toast.present();
	}

	

	async mostrarAlertAyuda() {
		const alert = await this.alertCtrl.create({
			header: '¿Qué significa el color?',
			subHeader: 'El color debajo del ticket representa el estado en el que se encuentra.',
			message: '<strong>AZUL</strong>: '
			+ 'Tu ticket acaba de ser levantado y aún no es atendido.<br><br>'
			+ '<strong>NARANJA</strong>: '
			+ 'Tu ticket está en proceso de atención.<br><br>'
			+ '<strong>VERDE</strong>: '
			+ 'Tu ticket fue resuelto.<br><br>'
			+ '<strong>GRIS</strong>: '
			+ 'Tu ticket fue cancelado.<br><br>'
			+ '<strong>ROJO</strong>: '
			+ 'Tu ticket no pudo ser resuelto.',
			buttons: ['ENTENDIDO']
		});
		
		await alert.present();
	}

}
