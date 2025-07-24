import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

export const routes: Routes = [
    {path:'',redirectTo:'/catalog',pathMatch:'full'},
    {path:'cart', component:CartComponent},
    {path:'catalog',component:CatalogoComponent}
];
