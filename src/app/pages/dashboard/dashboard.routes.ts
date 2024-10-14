import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes =[
    {
        path: '',
        loadComponent: ()=> import('./layout-dashboard/layout-dashboard.component'),
        children:[
            {
                path:'',
                loadComponent: () => import('./inicio-dashboard/inicio-dashboard.component')
            },
            {
                path:'pedidos',
                loadComponent: () => import('./pedidos/pedidos.component')
            },
            {
                path: 'productos',
                loadComponent: () => import('./productos/productos.component')
            },
            {
                path: 'categorias',
                loadComponent:( ) => import('./categorias/categorias.component')
            }
        ]
    }
] as Routes;

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutesModule{}