import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuService } from './services/menu.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {

	showMenu: boolean = true;

	constructor( private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private menuService: MenuService ) {
		this.initializeApp();

		this.menuService.getShowMenuEmitter().subscribe( show => this.showMenu = show );
	}
	
	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}
}
