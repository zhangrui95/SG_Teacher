import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DecisionPage } from './decision';

@NgModule({
  declarations: [
    DecisionPage,
  ],
  imports: [
    IonicPageModule.forChild(DecisionPage),
  ],
})
export class DecisionPageModule {}
