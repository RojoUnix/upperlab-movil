import { AlumnoPage } from './alumno.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TicketsPage } from '../../pages/tickets/tickets.page';
import { ConversacionPage } from '../../pages/conversacion/conversacion.page';
import { AllGuard } from '../../guards/all.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ROLES } from '../../config/config';
import { AsistenciaQrPage } from './pages/asistencia-qr/asistencia-qr.page';

const routes: Routes = [
	{
		path: 'alumno',
		component: AlumnoPage,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'asistencia'
			},
			{
				path: 'asistencia',
				pathMatch: 'full',
				component: AsistenciaQrPage,
				canActivate: [AllGuard],
				data: {
					guards: [AuthGuard, RoleGuard],
					roles: [ROLES.ALUMNO]
				}
			},
			{
				path: 'tickets',
				pathMatch: 'full',
				component: TicketsPage,
				canActivate: [AllGuard],
				data: {
					guards: [AuthGuard, RoleGuard],
					roles: [ROLES.ALUMNO]
				}
			},
			{
				path: 'tickets/nuevo',
				pathMatch: 'full',
				component: TicketsPage,
				canActivate: [AllGuard],
				data: {
					guards: [AuthGuard, RoleGuard],
					roles: [ROLES.ALUMNO]
				}
			},
			{
				path: 'tickets/conversacion/:idTicket',
				pathMatch: 'full',
				component: ConversacionPage,
				canActivate: [AllGuard],
				data: {
					guards: [AuthGuard, RoleGuard],
					roles: [ROLES.ALUMNO]
				}
			},
			// {
			// 	path: 'solicitud',
			// 	pathMatch: 'full',
			// 	component: ConversacionPage,
			// 	canActivate: [AllGuard],
			// 	data: {
			// 		guards: [AuthGuard, RoleGuard],
			// 		roles: [ROLES.ALUMNO]
			// 	}
			// }
		]
		
	}
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(routes)
	],
	exports:[ 
		RouterModule 
	]
})
export class AlumnoRoutingModule { }
