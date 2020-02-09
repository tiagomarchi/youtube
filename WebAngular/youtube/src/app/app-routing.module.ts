import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: 'search',
    component: YoutubeSearchComponent,
    // canActivate: [ AuthGuardService ]
  },
  {
    path: 'videos',
    component: YoutubeSearchComponent,
    // canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home',
    // canActivate: [ AuthGuardService ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


