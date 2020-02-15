import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { ChartsModule } from 'ng2-charts';
<<<<<<< HEAD
=======
import { Tab3Page } from '../tab3/tab3.page';
>>>>>>> 74aa774f61ad52cd76f068d977b4fdfe68d17873

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
<<<<<<< HEAD
  declarations: [Tab2Page],
=======
  declarations: [Tab2Page, Tab3Page],
  entryComponents: [Tab3Page]
>>>>>>> 74aa774f61ad52cd76f068d977b4fdfe68d17873
})
export class Tab2PageModule {}
