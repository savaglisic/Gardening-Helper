import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormControl, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { OurmissionComponent } from './ourmission/ourmission.component';
import { AlertsComponent } from './alerts/alerts.component';
import { MygardenComponent } from './mygarden/mygarden.component';
import { GardeninggoodiesComponent } from './gardeninggoodies/gardeninggoodies.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    SignupComponent,
    LoginComponent,
    ContactComponent,
    OurmissionComponent,
    AlertsComponent,
    MygardenComponent,
    GardeninggoodiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
