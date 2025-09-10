import { Routes } from '@angular/router';
import { Pedido }  from './components/pedido/pedido';
import { Login } from './components/login/login';


export const routes: Routes = [
    {
        path: '', component: Login
    },
    {
        path: 'login', component: Login
    },
    {
        path: 'pedido', component: Pedido
    }
];
