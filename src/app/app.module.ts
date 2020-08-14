import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { UserServiceService } from './services/user-service.service';
import { RegisterComponent } from './login/register/register.component';
import { LoginUserState } from './services/loginuser.state';
import { NgxsModule } from '@ngxs/store';
import { ListServiceService } from './services/List-service.service';
import { CreateListComponent } from './dashboard/create list/create-list.component';
import { DetailListComponent } from './dashboard/Detail list/detailList.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({ 
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    NgxsModule.forRoot([
      LoginUserState
    ]),
    HttpClientModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    CreateListComponent,
    DetailListComponent
  ],
  providers: [UserServiceService,ListServiceService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent,RegisterComponent,CreateListComponent,DetailListComponent]
})
export class AppModule { }
