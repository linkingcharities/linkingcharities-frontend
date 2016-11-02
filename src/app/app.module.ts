import './rxjs-extensions';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { AppComponent } from './app.component';
import { CharitiesComponent } from './components/charities/charities.component';
import { CharityService } from './services/charity.service';
import { CharityDetailComponent } from './components/charity-detail/charity-detail.component';
import { CharityFormComponent } from './components/charity-form/charity-form.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AuthService } from './services/auth.service';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
import { FacebookLoginComponent } from "./components/facebook-login/facebook-login.component";
import { CharitySearchComponent } from './components/charity-search/charity-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ToasterModule
  ],
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    ProjectsPageComponent,
    AppComponent,
    LoginComponent,
    NavigationComponent,
    CharitiesComponent,
    CharityDetailComponent,
    CharityFormComponent,
    CarouselComponent,
    FacebookLoginComponent,
    CharitySearchComponent
  ],
  providers: [CharityService, AuthService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}