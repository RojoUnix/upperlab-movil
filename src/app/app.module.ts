
// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Ionic
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

// AngularFire / Firebase / Servicios propios
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './services/fcm.service';

// Modules
import { ComponentsModule } from './components/components.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Data
import { environment } from '../environments/environment';


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
		AppRoutingModule, 
		ReactiveFormsModule,
		HttpClientModule,
		FormsModule
	],
	providers: [
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
