import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { LoginGuard } from '../../guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: LoginPage,
		pathMatch: 'full',
		canActivate: [LoginGuard]
	}
];

@NgModule({
	declarations: [],
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule 
	]
})
export class LoginRoutingModule { }
