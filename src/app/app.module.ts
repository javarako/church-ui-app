import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MemberTemplateComponent } from './components/member-template/member-template.component';
import { NumberAssignmentComponent } from './components/number-assignment/number-assignment.component';
import { OfferingEntryComponent } from './components/offering-entry/offering-entry.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { BudgetAssignmentComponent } from './components/budget-assignment/budget-assignment.component';
import { ExpenditureListComponent } from './components/expenditure-list/expenditure-list.component';
import { ExpenditureDetailsComponent } from './components/expenditure-details/expenditure-details.component';
import { AddExpenditureComponent } from './components/add-expenditure/add-expenditure.component';
import { ExpenditureTemplateComponent } from './components/expenditure-template/expenditure-template.component';
import { LoginComponent } from './components/login/login.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { AddAttendanceComponent } from './components/add-attendance/add-attendance.component';
import { ReportDownloadComponent } from './components/report-download/report-download.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersListComponent,
    MemberDetailsComponent,
    AddMemberComponent,
    MemberTemplateComponent,
    NumberAssignmentComponent,
    OfferingEntryComponent,
    ConfirmDialogComponent,
    BudgetAssignmentComponent,
    ExpenditureListComponent,
    ExpenditureDetailsComponent,
    AddExpenditureComponent,
    ExpenditureTemplateComponent,
    LoginComponent,
    AddAttendanceComponent,
    ReportDownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,

    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,

    FontAwesomeModule
  ],
  providers: [authInterceptorProviders,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
