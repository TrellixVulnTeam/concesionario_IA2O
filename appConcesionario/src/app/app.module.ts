import { AgregarvehiculoComponent } from './components/agregarvehiculo/agregarvehiculo.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
/*import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';*/

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComunesModule } from './components/comunes/comunes.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { ViewImagePipe } from './pipes/view-image.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [AppComponent, ViewImagePipe, TruncatePipe, AgregarvehiculoComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ComunesModule,
    ReactiveFormsModule,
    FormsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    /*StatusBar,
    SplashScreen,*/
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
