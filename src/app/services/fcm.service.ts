import { Injectable } from '@angular/core';

import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';


@Injectable({
	providedIn: 'root'
})
export class FcmService {
	
	constructor( public firebaseNative: Firebase, public afs: AngularFirestore, private platform: Platform, private authService: AuthService ) {}
	
	// Get permission from the user
	async getToken() {
		let token;
		
		if (this.platform.is('android')) {
			token = await this.firebaseNative.getToken();
		} 
		
		if (this.platform.is('ios')) {
			token = await this.firebaseNative.getToken();
			await this.firebaseNative.grantPermission();
		} 
		
		return this.saveTokenToFirestore(token);
	}
	
	// Save the token to firestore
	private saveTokenToFirestore( token: string ) {
		if (!token) { return; }
		
		const devicesRef = this.afs.collection('fcmTokens');
		
		const matricula = this.authService.usuario.email.split('@')[0].toUpperCase();
		const docData = { 
			matricula,
			uid: this.authService.usuario.uid
		};
		
		return devicesRef.doc(token).set(docData);
	}
	
	// Listen to incoming FCM messages
	listenToNotifications() {
		return this.firebaseNative.onNotificationOpen();
	}
}
