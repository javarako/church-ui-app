import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { NumberAssignmentComponent } from './components/number-assignment/number-assignment.component';
import { BudgetAssignmentComponent } from './components/budget-assignment/budget-assignment.component';
import { OfferingEntryComponent } from './components/offering-entry/offering-entry.component';
import { ExpenditureListComponent } from './components/expenditure-list/expenditure-list.component';
import { ExpenditureDetailsComponent } from './components/expenditure-details/expenditure-details.component';
import { AddExpenditureComponent } from './components/add-expenditure/add-expenditure.component';
import { AddAttendanceComponent } from './components/add-attendance/add-attendance.component';
import { ReportDownloadComponent } from './components/report-download/report-download.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'members', component: MembersListComponent },
  { path: 'members/:id', component: MemberDetailsComponent },
  { path: 'addMember', component: AddMemberComponent },
  { path: 'numbers', component: NumberAssignmentComponent },
  { path: 'budgets', component: BudgetAssignmentComponent },
  { path: 'offerings', component: OfferingEntryComponent },
  { path: 'expenditures', component: ExpenditureListComponent },
  { path: 'expenditures/:id', component: ExpenditureDetailsComponent },
  { path: 'addExpenditure', component: AddExpenditureComponent },
  { path: 'addAttendance', component: AddAttendanceComponent },
  { path: 'reports', component: ReportDownloadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
