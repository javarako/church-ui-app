import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersListComponent } from './components/members-list/members-list.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { NumberAssignmentComponent } from './components/number-assignment/number-assignment.component';
import { OfferingEntryComponent } from './components/offering-entry/offering-entry.component';

const routes: Routes = [
  { path: '', redirectTo: 'members', pathMatch: 'full' },
  { path: 'members', component: MembersListComponent },
  { path: 'members/:id', component: MemberDetailsComponent },
  { path: 'add', component: AddMemberComponent },
  { path: 'numbers', component: NumberAssignmentComponent },
  { path: 'offerings', component: OfferingEntryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
