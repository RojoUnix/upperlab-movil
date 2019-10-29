import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch:'full' },
	// { path: 'alumno', loadChildren: './modules/alumno/alumno.module#AlumnoPageModule' },
	// { path: 'login', loadChildren: './modules/login/login.module#LoginPageModule' },
	{ path: '**', redirectTo: '/login' }
//   { path: 'solicitudes-profesor', loadChildren: './modules/profesor/pages/solicitudes-profesor/solicitudes-profesor.module#SolicitudesProfesorPageModule' }

];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {  }
