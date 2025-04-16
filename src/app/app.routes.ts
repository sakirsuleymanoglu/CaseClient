import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { alreadyAuthGuard } from './guards/already-auth.guard';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
    {
        path: "", redirectTo: "login", pathMatch: "full"
    },
    {
        path: "home", component: HomeComponent, canActivate: [authGuard],
    },
    {
        path: "login", component: LoginComponent, canActivate: [alreadyAuthGuard]
    }
];
