import { AdminPage } from './admin.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { TicketsPage } from '../../pages/tickets/tickets.page';

const routes: Routes = [
	{
		path: 'admin',
		component: AdminPage,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'tickets'
			},
			{
				path: 'tickets',
				pathMatch: 'full',
				component: TicketsPage,
			}
		]
		
	}
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	]
})
export class AdminRoutingModule { }
