import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component'; // Ajusta la ruta según sea necesario
import { RegistrarComponent } from './components/registrar/registrar.component'; // Ajusta la ruta según sea necesario

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        component: IndexComponent
    },
    { path: 'login',
        component: LoginComponent },
    { path: 'registrar',
        component: RegistrarComponent }

];
