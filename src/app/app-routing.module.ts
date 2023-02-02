import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AlertsComponent } from './alerts/alerts.component';
import { ContactComponent } from './contact/contact.component';
import { GardeninggoodiesComponent } from './gardeninggoodies/gardeninggoodies.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { MygardenComponent } from './mygarden/mygarden.component';
import { OurmissionComponent } from './ourmission/ourmission.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'', component: HomepageComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'contact',component: ContactComponent},
  {path: 'alerts',component: AlertsComponent},
  {path: 'mygarden',component: MygardenComponent},
  {path: 'goodies',component: GardeninggoodiesComponent},
  {path: 'ourmission',component: OurmissionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
