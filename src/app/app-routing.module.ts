import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	// { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
	{ path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
	{path: '**', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
