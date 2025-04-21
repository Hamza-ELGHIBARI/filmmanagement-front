import { Routes } from "@angular/router";
import { FavoriteComponent } from "./favorite/favorite.component";
import { UserLayoutComponent } from "./user-layout/user-layout.component";
import { AuthGuard } from "../../guards/auth.guard";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";

export const USER_ROUTES: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: UserDashboardComponent },
            { path: 'favorite', component: FavoriteComponent },
        ]
    }
];
