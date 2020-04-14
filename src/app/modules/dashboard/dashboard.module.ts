import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent} from './dashboard/dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCg_Oi5U92iouXkJjY2zh0Y20LSRn6xWW4',
      libraries: ['places']
    }),
    AgmDirectionModule
  ]
})
export class DashboardModule { }
