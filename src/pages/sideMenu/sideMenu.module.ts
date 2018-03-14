import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SideMenuPage } from './sideMenu';

@NgModule({
  declarations: [
    SideMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(SideMenuPage),
  ],
})
export class SideMenuPageModule {}
