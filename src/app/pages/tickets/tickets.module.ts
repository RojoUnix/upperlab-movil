import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TicketsPage } from './tickets.page'; 
import { AllGuard } from '../../guards/all.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { RoleGuard } from '../../guards/role.guard';
import { ROLES } from '../../config/config';

const routes: Routes = [
	{ 
		path: '', 
		component: TicketsPage,
		canActivate: [AllGuard],
		data: {
			guards: [AuthGuard, RoleGuard],
			roles: [ROLES.ADMINISTRADOR, ROLES.ALUMNO, ROLES.PROFESOR]
		}	
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		ComponentsModule
	],
	declarations: [
		TicketsPage
	]
})
export class TicketsPageModule {}
