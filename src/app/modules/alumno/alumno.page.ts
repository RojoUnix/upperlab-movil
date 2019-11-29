import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FcmService } from '../../services/fcm.service';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-alumno',
	templateUrl: './alumno.page.html',
	styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
	
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
