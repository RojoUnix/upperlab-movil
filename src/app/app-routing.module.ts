import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'asistencia',
		loadChildren: './pages/asistencia-qr/asistencia-qr.module#AsistenciaQrPageModule',
	},
	{
		path: 'tickets',
		loadChildren: './pages/tickets/tickets.module#TicketsPageModule',
	},
	{
		path: 'tickets/nuevo',	
		loadChildren: './pages/nuevo-ticket/nuevo-ticket.module#NuevoTicketPageModule',
	},
	{
		path: 'tickets/conversacion/:idTicket',
		loadChildren: './pages/conversacion/conversacion.module#ConversacionPageModule',
	},
	{
		path: 'login',
		loadChildren: './pages/login/login.module#LoginPageModule'
	},
	{
		path: '**',
		redirectTo: 'login'
	}
	
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	],
	exports: [RouterModule]
})
export class AppRoutingModule {  }
