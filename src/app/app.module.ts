import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { LoginPageModule } from './modules/login/login.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from './services/chat.service';
import { ComponentsModule } from './components/components.module';
import { AdminPageModule } from './modules/admin/admin.module';
import { AlumnoPageModule } from './modules/alumno/alumno.module';
import { ProfesorPageModule } from './modules/profesor/profesor.module';

import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './services/fcm.service';

@NgModule({
	declarations: [
		AppComponent,
	],
	entryComponents: [],
	imports: [
		BrowserModule, 
		IonicModule.forRoot(), 
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireAuthModule,
		IonicStorageModule.forRoot(),
		ComponentsModule,
		AlumnoPageModule,
		ProfesorPageModule,
		AdminPageModule,
		LoginPageModule,
		AppRoutingModule, 
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule
	],
	providers: [
		
		ChatService,
		StatusBar,
		SplashScreen,
		ComponentsModule,
		BarcodeScanner,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		Firebase,
		FcmService,
		AngularFirestore
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
