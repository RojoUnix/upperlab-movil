import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch:'full' },
	// { path: 'alumno', loadChildren: './modules/alumno/alumno.module#AlumnoPageModule' },
	// { path: 'login', loadChildren: './modules/login/login.module#LoginPageModule' },
	{ path: '**', redirectTo: '/login' },

];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {  }
