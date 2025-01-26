import { Routes } from '@angular/router';
import { ItemComponent } from './Share/Components/item/item.component';
import { ItemLayoutsComponent } from './Share/Components/item-layouts/item-layouts.component';

export const routes: Routes = [
    {
        path:'',
        component: ItemLayoutsComponent,
    },
    {
        path: 'item/:id',
        loadComponent: ()=> import('./Share/Components/item/item.component').then((run)=> run.ItemComponent)
    }
];
