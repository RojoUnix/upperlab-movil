import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  opciones: any = [
    {
      nombre: 'Asistencia',
      icono: 'hammer',
      link: ['/alumno/asistencia']
    },
    {
      nombre: 'Ticket',
      icono: 'hammer',
      link: ['/alumno/tickets']
    },
    {
      nombre: 'Solicitud de laboratorios',
      icono: 'hammer',
      link: ['/alumno/solicitud']
    }
  ]
  constructor( public authService: AuthService ) { }

  ngOnInit() {}

}
