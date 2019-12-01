import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		ComponentsModule
	],
	declarations: [LoginPage]
})
export class LoginPageModule {}
