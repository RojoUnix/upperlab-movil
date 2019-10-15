import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		LoginRoutingModule,
		ComponentsModule
	],
	declarations: [LoginPage]
})
export class LoginPageModule {}
