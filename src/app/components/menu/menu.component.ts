import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ROLES } from '../../config/config';
import { Observable } from 'rxjs';
import { MenuOption } from '../../shared/interfaces/interfaces';
import { DataService } from '../../services/data.service';

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

	constructor( public authService: AuthService, private dataService: DataService ) { }

	ngOnInit() {
		// Elegir opciones a mostrar segun el rol del usuario
		this.opciones = this.dataService.getMenu( this.authService.rol );
	
		this.nombreDeUsuario = this.authService.usuario.displayName;
		this.correoDeUsuario = this.authService.usuario.email;
	}
	
}
