import { AdminPage } from './admin.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllGuard } from '../../guards/all.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ROLES } from '../../config/config';
import { ListaTicketsComponent } from '../../components/lista-tickets/lista-tickets.component';
import { ChatComponent } from '../../components/chat/chat.component';

const routes: Routes = [
	{
		path: '',
		component: AdminPage,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: '/admin/tickets'
			},
			{
				path: 'tickets',
				pathMatch: 'full',
				component: ListaTicketsComponent,
				canActivate: [AllGuard],
				data: {
					guards: [AuthGuard, RoleGuard],
					roles: [ROLES.ADMINISTRADOR]
				}
			},
			{
				path: 'tickets/conversacion/:idTicket',
				pathMatch: 'full',
				component: ChatComponent,
				canActivate: [AllGuard],
				data: {
					guards: [AuthGuard, RoleGuard],
					roles: [ROLES.ADMINISTRADOR]
				}
			}
		]
	}
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule { }
