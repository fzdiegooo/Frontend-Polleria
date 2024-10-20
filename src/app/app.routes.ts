import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: ()=> import("./pages/inicio/layout-inicio/layout-inicio.component"),
        children: [
            {
                path:'inicio',
                loadComponent: () => import('./pages/inicio/pantalla-inicio/pantalla-inicio.component')
            },
            {
                path:'carta',
                loadComponent: () => import('./pages/inicio/carta/carta.component')
            },
            {
                path: 'promociones',
                loadComponent: () => import('./pages/inicio/carta/carta.component')
            },
            {
                path: 'login',
                loadComponent: () => import('./pages/inicio/auth/login/login.component')
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/inicio/auth/register/register.component')
            },
            {
              path: "",
              redirectTo: 'inicio',
              pathMatch: 'full'
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
