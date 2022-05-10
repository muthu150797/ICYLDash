import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseRoutingModule } from '../base/base-routing.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app.routing';
import { HomeComponent } from './home.component';
import { CarouselsComponent } from '../base/carousels.component';
import { CollapsesComponent } from '../base/collapses.component';
import { FormsComponent } from '../base/forms.component';
import { NavbarsComponent } from '../base/navbars/navbars.component';
import { PaginationsComponent } from '../base/paginations.component';
import { PopoversComponent } from '../base/popovers.component';
import { ProgressComponent } from '../base/progress.component';
import { SwitchesComponent } from '../base/switches.component';
import { TablesComponent } from '../base/tables.component';
import { TabsComponent } from '../base/tabs.component';
import { TooltipsComponent } from '../base/tooltips.component';



@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ConfigurationRoutingModule,
    AppRoutingModule,

  ],
  declarations: [
    HomeComponent
  ]
})
export class ConfigurationModule { }
