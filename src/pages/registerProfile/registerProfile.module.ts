import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterProfilePage } from './registerProfile';

@NgModule({
  declarations: [
    RegisterProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterProfilePage),
  ],
})
export class RegisterProfilePageModule {}
