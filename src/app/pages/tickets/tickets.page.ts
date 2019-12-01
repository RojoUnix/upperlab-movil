import { Component, OnInit } from '@angular/core';
import { FcmService } from '../../services/fcm.service';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-tickets',
	templateUrl: './tickets.page.html',
	styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
	
	constructor( private fcm: FcmService, private toastCtrl: ToastController ) {}
	
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

}
