import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: ()=> import("./pages/inicio/layout-inicio/layout-inicio.component"),
        children: [
            {
                path: "inicio",
                loadComponent: () => import("./pages/inicio/pantalla-inicio/pantalla-inicio.component"),
            }
        ]
    },
    {
        path: "dashboard",
        loadChildren: ()=> import("./pages/dashboard/dashboard.routes").then(m => m.DashboardRoutesModule),
        data:{
            title: 'Dashboard',
            roles: ['administrador', 'empleado']
        }
    },
    {
        path: "panel-cliente",
        loadChildren: () => import("./pages/panel-cliente/panel-cliente.routes").then(m => m.PanelClienteRoutesModule),
    },
    {
        path: "**",
        redirectTo: ''
    }
];
