import { Routes } from '@angular/router';
import { isLoggedGuard } from './core/guards/auth/is-logged.guard';
import { hasRoleGuard } from './core/guards/auth/has-role.guard';
import { hasRoleAllowGuard } from './core/guards/auth/has-role-allow.guard';

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
                path: 'producto/:id',
                loadComponent: () => import('./pages/inicio/producto/producto.component')
            },
            {
                path: 'checkout-payment',
                loadComponent: () => import('./pages/inicio/checkout-payment/checkout-payment.component')
            },
            {
                canMatch: [isLoggedGuard, hasRoleGuard],
                canActivate: [hasRoleAllowGuard],
                path: 'cliente',
                loadComponent: () => import('./pages/panel-cliente/layout-panel-cliente/layout-panel-cliente.component'),
                children:[
                    {
                        path:'',
                        loadComponent: () => import('./pages/panel-cliente/inicio-panel-cliente/inicio-panel-cliente.component')
                    },
                    {
                        path:'perfil',
                        loadComponent: () => import('./pages/panel-cliente/inicio-panel-cliente/inicio-panel-cliente.component')
                    },
                    {
                        path:'pedidos',
                        loadComponent: () => import('./pages/panel-cliente/pedidos-cliente/pedidos-cliente.component')
                    }
                ],
                data:{
                    title: 'Panel Cliente',
                    roles: ['Cliente']
                }
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
        canMatch: [isLoggedGuard, hasRoleGuard],
        canActivate: [hasRoleAllowGuard],
        loadChildren: ()=> import("./pages/dashboard/dashboard.routes").then(m => m.DashboardRoutesModule),
        data:{
            title: 'Dashboard',
            roles: ['Administrador']
        }
    },
    {
        path: "**",
        redirectTo: ''
    }
];
