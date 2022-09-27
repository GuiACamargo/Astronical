import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterceptorInterceptorProvider } from './auth/interceptor.interceptor';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { EraseUserDialogComponent } from './erase-user-dialog/erase-user-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material/material.module';
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
import { PubliFormComponent } from './publi-form/publi-form.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HomeComponent,
        ApodComponent,
        AboutUsComponent,
        RegisterComponent,
        SignInComponent,
        PubliFormComponent,
        NewPubliComponent,
        EditPubliComponent,
        AllPubliComponent,
        DeleteDialogComponent,
        ProfileComponent,
        AllUsersComponent,
        EraseUserDialogComponent,
        RegisterAdminComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MaterialModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        NgxMaskModule.forRoot(),
        NgxMatFileInputModule,
    ],
    providers: [
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
        InterceptorInterceptorProvider,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
