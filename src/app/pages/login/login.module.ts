import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { LoginGuard } from '../../guards/login.guard';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
	{
		path: '',
		component: LoginPage,
		canActivate: [LoginGuard]
	}
];


@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		IonicModule,
		FormsModule
	],
	declarations: [LoginPage]
})
export class LoginPageModule {}
