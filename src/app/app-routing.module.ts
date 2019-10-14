import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
	{ path: 'asistencia-qr', loadChildren: './pages/asistencia-qr/asistencia-qr.module#AsistenciaQrPageModule' },
	{ path: 'alumno', loadChildren: './pages/alumno/alumno.module#AlumnoPageModule' },
	{ path: 'profesor', loadChildren: './pages/profesor/profesor.module#ProfesorPageModule' },
	{ path: 'administrador', loadChildren: './pages/administrador/administrador.module#AdministradorPageModule' },
	{ path: 'super-admin', loadChildren: './pages/super-admin/super-admin.module#SuperAdminPageModule' },
	{ path: 'tickets', loadChildren: './pages/tickets/tickets.module#TicketsPageModule' },
	{ path: 'nuevo-ticket', loadChildren: './pages/nuevo-ticket/nuevo-ticket.module#NuevoTicketPageModule' },
	{ path: 'conversacion/:idTicket', loadChildren: './pages/conversacion/conversacion.module#ConversacionPageModule', data:{}},
	{ path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
	{ path: 'tickets-admin', loadChildren: './pages/tickets-admin/tickets-admin.module#TicketsAdminPageModule' },
	{ path: '**', pathMatch: 'full', redirectTo: 'login'},





];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {  }
