import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllowEditGuard } from './auth/allow-edit.guard';
import { AllowProfileGuard } from './auth/allow-profile.guard';
import { IsAuthenticatedGuard } from './auth/is-authenticated.guard';
import { RoleAccessGuard } from './auth/role-access.guard';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AllPubliComponent } from './pages/all-publi/all-publi.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { ApodComponent } from './pages/apod/apod.component';
import { EditPubliComponent } from './pages/edit-publi/edit-publi.component';
import { HomeComponent } from './pages/home/home.component';
import { NewPubliComponent } from './pages/new-publi/new-publi.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { RegisterComponent } from './pages/register/register.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'about-us',
        component: AboutUsComponent,
    },
    { path: 'apod', component: ApodComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'sign-in', component: SignInComponent },
    {
        path: 'post/new',
        component: NewPubliComponent,
        canActivate: [IsAuthenticatedGuard],
    },
    {
        path: 'post/all',
        component: AllPubliComponent,
        canActivate: [IsAuthenticatedGuard],
    },
    {
        path: 'post/edit/:id',
        component: EditPubliComponent,
        canActivate: [IsAuthenticatedGuard, AllowEditGuard],
    },
    {
        path: 'profile/:email',
        component: ProfileComponent,
        canActivate: [IsAuthenticatedGuard, AllowProfileGuard],
    },
    {
        path: 'admin/allusers',
        component: AllUsersComponent,
        canActivate: [IsAuthenticatedGuard, RoleAccessGuard],
        data: {
            role: 'admin',
        },
    },
    {
        path: 'admin/new',
        component: RegisterAdminComponent,
        canActivate: [IsAuthenticatedGuard, RoleAccessGuard],
        data: {
            role: 'admin',
        },
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
