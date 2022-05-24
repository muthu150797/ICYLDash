// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CardsComponent } from './cards.component';

// Forms Component
import { FormsComponent } from './forms.component';

import { SwitchesComponent } from './switches.component';
import { TablesComponent } from './tables.component';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabsComponent } from './tabs.component';

// Carousel Component
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselsComponent } from './carousels.component';

// Collapse Component
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CollapsesComponent } from './collapses.component';

// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Pagination Component
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoversComponent } from './popovers.component';

// Popover Component
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PaginationsComponent } from './paginations.component';

// Progress Component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ProgressComponent } from './progress.component';

// Tooltip Component
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TooltipsComponent } from './tooltips.component';

// navbars
import { NavbarsComponent } from './navbars/navbars.component';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { HomeComponent } from './home.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import {ConfirmDialogModule} from 'primeng/confirmdialog'; import {ConfirmationService, MessageService} from 'primeng/api';
import { Browser } from 'protractor';
import { BrowserModule } from '@angular/platform-browser';
import { QuotesComponent } from './quotes/quotes.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../notifications/modals.component';
import { NotificationsRoutingModule } from '../notifications/notifications-routing.module';
import { DialogModule } from "primeng/dialog";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { QuickDonationComponent } from './quick-donation/quick-donation.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ProgressBarModule} from 'primeng/progressbar';
import { DonationCategoryComponent } from './donation-category/donation-category.component';
import { UsersComponent } from './users/users.component';
import { SubscriptionComponent } from './subscription/subscription.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
     //prime ng
     ButtonModule,
     ScrollPanelModule,
     InputTextareaModule,
     TableModule,
     InputTextModule,
     MessagesModule,
     MessageModule,
     ProgressSpinnerModule,
     CalendarModule,
     ToastModule,
     ProgressBarModule,
     DialogModule,
     ConfirmDialogModule,
     SliderModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers:[MessageService],
  declarations: [
    CardsComponent,
    FormsComponent,
    SwitchesComponent,
    TablesComponent,
    TabsComponent,
    HomeComponent,
    CarouselsComponent,
    CollapsesComponent,
    PaginationsComponent,
    PopoversComponent,
    ProgressComponent,
    TooltipsComponent,
    NavbarsComponent,
    QuotesComponent,
    QuickDonationComponent,
    DonationCategoryComponent,
    UsersComponent,
    SubscriptionComponent,

  ]
})
export class BaseModule { }
