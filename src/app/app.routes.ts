import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout';
import { Pedido } from './components/pedido/pedido';
//import { ProdutosComponent } from './components/produtos/produtos';
//import { ClientesComponent } from './components/clientes/clientes';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'pedido', component: Pedido },
     // { path: 'produtos', component: ProdutosComponent },
   //   { path: 'clientes', component: ClientesComponent },
      // ...adicione mais rotas conforme necessário
    ]
  },
  { path: 'login', component: Login }
];
