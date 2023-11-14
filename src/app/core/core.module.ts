import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderComponent } from './loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader-interceptor';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    NavbarComponent,
    LoaderComponent,
    AuthComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    NavbarComponent,
    LoaderComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi : true
  }]
})
export class CoreModule { }
