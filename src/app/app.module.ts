import './rxjs-extensions';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { QuizPageComponent } from './components/quiz/quiz.component';
import { QuizQuestionComponent } from './components/quiz-question/quiz-question.component';
import { QuizService } from './services/quiz.service';
import { AppComponent } from './app.component';
import { CharitiesComponent } from './components/charities/charities.component';
import { CharityService } from './services/charity.service';
import { CharityDetailComponent } from './components/charity-detail/charity-detail.component';
import { CharityFormComponent } from './components/charity-form/charity-form.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AuthService } from './services/auth.service';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
import { FacebookLoginComponent } from './components/facebook-login/facebook-login.component';
import { CharitySearchComponent } from './components/charity-search/charity-search.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppStateService } from './services/app-state.service';
import { CharityGridComponent } from './components/charity-grid/charity-grid.component';
import { LoginSmallComponent } from './components/login-small/login-small.component';
import { ProtectedDirective } from './directives/protected.directive';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ToasterModule,
    ChartsModule
  ],
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    QuizPageComponent,
    QuizQuestionComponent,
    AppComponent,
    LoginComponent,
    SignupComponent,
    ThankYouComponent,
    NavigationComponent,
    CharitiesComponent,
    CharityGridComponent,
    CharityDetailComponent,
    CharityFormComponent,
    CarouselComponent,
    FacebookLoginComponent,
    CharitySearchComponent,
    PageNotFoundComponent,
    LoginSmallComponent,
    ProtectedDirective,
    BarChartComponent
  ],
  providers: [CharityService, AuthService, ToasterService, AppStateService, QuizService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
