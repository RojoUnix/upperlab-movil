import { AdminPage } from './admin.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllGuard } from '../../guards/all.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ROLES } from '../../config/config';
import { TicketsAdminPage } from '../../pages/tickets-admin/tickets-admin.page';
import { ConversacionPage } from '../admin/pages/conversacion/conversacion.page';

const routes: Routes = [
	{
		path: 'admin',
		component: AdminPage,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'tickets'
			},
			{
				path: 'tickets',
				pathMatch: 'full',
				component: TicketsAdminPage,
				canActivate: [AllGuard],
				data: {
					guards: [AuthGuard, RoleGuard],
					roles: [ROLES.ADMINISTRADOR]
				}
			},
			{
				path: 'tickets/conversacion/:idTicket',
				pathMatch: 'full',
				component: ConversacionPage,
				canActivate: [AllGuard],
				data: {
					guards: [AuthGuard, RoleGuard],
					roles: [ROLES.ADMINISTRADOR]
				}
			}
		]
		
	},
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports:[RouterModule],
})
export class AdminRoutingModule { }
