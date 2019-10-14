import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { NuevoTicketPage } from './nuevo-ticket.page';

const routes: Routes = [
	{
		path: '',
		component: NuevoTicketPage
	}
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		NuevoTicketPage
	]
})
export class NuevoTicketPageModule {}
