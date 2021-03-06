import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { QuizPageComponent } from './components/quiz/quiz.component';
import { CharitiesComponent } from './components/charities/charities.component';
import { CharityFormComponent } from './components/charity-form/charity-form.component';
import { CharityDetailComponent } from './components/charity-detail/charity-detail.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { VolunteeringComponent } from './components/volunteering/volunteering.component';
import { VolunteeringDetailComponent } from './components/volunteering-detail/volunteering-detail.component';
import { VolunteeringFormComponent } from './components/volunteering-form/volunteering-form.component';
import { VolunteeringUpdateFormComponent } from './components/volunteering-update-form/volunteering-update-form.component';
import { VolunteeringUpdateListComponent } from './components/volunteering-update-list/volunteering-update-list.component';
import { AuthGuard } from './services/auth-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'detail/:id', component: CharityDetailComponent},
  {path: 'charities/:type', component: CharitiesComponent},
  {path: 'charities', component: CharitiesComponent},
  {path: 'charity-form', component: CharityFormComponent},
  {path: 'thank-you/:id', component: ThankYouComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'quiz',
    component: QuizPageComponent
    // ,canActivate: [AuthGuard]
  },
  {path: 'volunteering', component: VolunteeringComponent},
  {
    path: 'volunteering-form',
    component: VolunteeringFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update-volunteering',
    component: VolunteeringUpdateListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-opportunity/:id',
    component: VolunteeringUpdateFormComponent
  },
  {path: 'o-detail/:id', component: VolunteeringDetailComponent},
  {path: '', component: HomePageComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {
}
