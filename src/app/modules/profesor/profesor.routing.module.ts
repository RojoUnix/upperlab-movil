import { ProfesorPage } from './profesor.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllGuard } from '../../guards/all.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ROLES } from '../../config/config';
import { SolicitudesProfesorPage } from './pages/solicitudes-profesor/solicitudes-profesor.page';
import { LevantarSolicitudProfesorComponent } from './pages/levantar-solicitud-profesor/levantar-solicitud-profesor.component';


const routes: Routes = [
	{
		path: 'profesor',
		component: ProfesorPage,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'solicitud'
			},
			{ 
				path: 'solicitud',
				pathMatch: 'full',
				component: SolicitudesProfesorPage,
				canActivate: [AllGuard],
				data: {
					guards: [AuthGuard, RoleGuard],
					roles: [ROLES.PROFESOR]
				} 
			},
			{ 
				path: 'solicitud/levantar',
				pathMatch: 'full',
				component: LevantarSolicitudProfesorComponent,
				canActivate: [AllGuard],
				data: {
					guards: [AuthGuard, RoleGuard],
					roles: [ROLES.PROFESOR]
				} 
			}
		]
		
	},
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forChild(routes)],
	exports:[RouterModule]
})
export class ProfesorRoutingModule { }
