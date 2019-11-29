import { Component, OnInit } from '@angular/core';
import { FcmService } from '../../services/fcm.service';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.page.html',
	styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
	
	constructor( public fcm: FcmService, public toastCtrl: ToastController ) { }
	
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
