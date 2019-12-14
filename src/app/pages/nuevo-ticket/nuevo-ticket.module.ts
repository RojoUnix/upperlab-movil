import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { NuevoTicketPage } from './nuevo-ticket.page';
import { ComponentsModule } from '../../components/components.module';
import { AllGuard } from '../../guards/all.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ROLES } from '../../config/config';

const routes: Routes = [
	{
		path: '',
		component: NuevoTicketPage,
		canActivate: [AllGuard],
		data: {
			guards: [AuthGuard, RoleGuard],
			roles: [ROLES.ALUMNO, ROLES.PROFESOR]
		}
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes),
		ComponentsModule
	],
	declarations: [
		NuevoTicketPage,
	]
})
export class NuevoTicketPageModule {}
