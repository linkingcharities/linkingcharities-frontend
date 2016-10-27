import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { CharitiesComponent } from './components/charities/charities.component';
import { CharityDetailComponent } from './components/charity-detail/charity-detail.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

const routes:Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'detail/:id', component: CharityDetailComponent},
  {path: 'charities', component: CharitiesComponent},
  {
    path: 'projects',
    component: ProjectsPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {
}