import './rxjs-extensions';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroService } from './services/hero.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { AppComponent } from './app.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { CharitiesComponent } from './components/charities/charities.component';
import { CharityService } from './services/charity.service';
import { CharityDetailComponent } from './components/charity-detail/charity-detail.component';
import { CharityFormComponent } from './components/charity-form/charity-form.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    ProjectsPageComponent,
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    LoginComponent,
    NavigationComponent,
    HeroSearchComponent,
    CharitiesComponent,
    CharityDetailComponent,
    CharityFormComponent
  ],
  providers: [HeroService, CharityService],
  bootstrap: [AppComponent]
})
export class AppModule {
}