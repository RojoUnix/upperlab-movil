import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ROLES } from '../../config/config';
import { Observable } from 'rxjs';
import { MenuOption } from '../../shared/interfaces/interfaces';
import { DataService } from '../../services/data.service';
import { MenuService } from '../../services/menu.service';

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

	constructor( private menuService: MenuService, public authService: AuthService, private dataService: DataService ) { }

	ngOnInit() {
		console.log('ngOnInit() - MenuComponent');
		// Elegir opciones a mostrar segun el rol del usuario
	
		this.sesionIniciada = this.authService.usuario ? true : false;

		if ( this.sesionIniciada ) {
			this.update();
		}

		this.menuService.getUpdateMenuEmitter().subscribe( () => {
			this.update();
		});

		// this.nombreDeUsuario = this.sesionIniciada ? this.authService.usuario.displayName : 'NA';
		// this.correoDeUsuario = this.sesionIniciada ? this.authService.usuario.email : 'NA';
	}
	
	update() {
		this.nombreDeUsuario = this.authService.usuario.displayName;
		this.correoDeUsuario = this.authService.usuario.email;
		this.opciones = this.dataService.getMenu( this.authService.rol );
	}
}
