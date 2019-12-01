import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { MenuOption } from '../../shared/interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { MenuService } from '../../services/menu.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
	usuario: number;
	nombreDeUsuario: string;
	correoDeUsuario: string;

	opciones: Observable<MenuOption[]>;

	sesionIniciada: boolean;

	constructor( private menuService: MenuService, public authService: AuthService, private dataService: DataService, private navCtrl: NavController, private router: Router ) { }

	ngOnInit() {
		
		this.sesionIniciada = this.authService.usuario ? true : false;

		if ( this.sesionIniciada ) {
			this.update();
		}

		this.menuService.getUpdateMenuEmitter().subscribe( () => {
			this.update();
		});
	}

	irA( url: any[] ) {
		this.navCtrl.navigateRoot(url);
	}

	isTicketsRoute(): boolean {
		return this.router.url.startsWith('/tickets');
	}
	
	update() {
		this.nombreDeUsuario = this.authService.usuario.displayName;
		this.correoDeUsuario = this.authService.usuario.email;
		this.opciones = this.dataService.getMenu( this.authService.rol );
	}
}
