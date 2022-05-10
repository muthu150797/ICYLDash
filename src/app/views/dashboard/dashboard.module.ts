import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ButtonsModule } from "ngx-bootstrap/buttons";

import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { Router } from "@angular/router";
import { DataService } from "../../Service/data.service";
import { CommonModule, DatePipe } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { HomeComponent } from "../configuration/home.component";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { SliderModule } from "primeng/slider";
import { TableModule } from "primeng/table";
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ToolbarModule} from 'primeng/toolbar';
import { InputTextModule } from "primeng/inputtext";
import {ProgressBarModule} from 'primeng/progressbar';
import { MessageModule } from "primeng/message";
import { MessagesModule } from "primeng/messages";
import { MessageService } from "primeng/api";
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    ToastModule,
    FormsModule,
    AgGridModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    //prime ng
    ButtonModule,
    TableModule,
    ToolbarModule,
    MessagesModule,
     MessageModule,
    ScrollPanelModule,
    CalendarModule,
    InputTextModule,
    ConfirmDialogModule,
    ProgressBarModule,
    SliderModule,
  ],
  providers:[MessageService,DatePipe],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    DashboardComponent

  ]
})
export class DashboardModule {

}
