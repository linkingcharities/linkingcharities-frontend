import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeroDetailComponent } from "./components/hero-detail/hero-detail.component";
import { HeroesComponent } from "./components/heroes/heroes.component";
import { HeroService } from "./services/hero.service";
import { AppRoutingModule } from "./app-routing.module";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { LoginComponent } from "./components/login/login.component";
import { AboutPageComponent } from "./components/about-page/about-page.component";
import { ProjectsPageComponent } from "./components/projects-page/projects-page.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
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
    NavigationComponent
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule {
}