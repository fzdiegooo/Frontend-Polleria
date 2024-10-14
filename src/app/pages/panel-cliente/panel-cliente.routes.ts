import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes =[
    {
        path: '',
        loadComponent: ()=> import('./layout-panel-cliente/layout-panel-cliente.component'),
        children:[
            {
                path:'',
                loadComponent: () => import('./inicio-panel-cliente/inicio-panel-cliente.component')
            },
            {
                path:'pedidos',
                loadComponent: () => import('./pedidos-cliente/pedidos-cliente.component')
            }
        ]
    }
] as Routes;

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PanelClienteRoutesModule{}