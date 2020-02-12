import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: 'search',
    component: YoutubeSearchComponent,
  },
  {
    path: 'videos',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


