import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker'

import { AdminLayoutRoutes } from './admin-layout.routing';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CountToModule } from 'angular-count-to';
import { DashboardsComponent } from 'src/app/pages/dashboards/dashboards.component';

import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { UserListComponent } from 'src/app/pages/user-list/user-list.component';
import { AddUserComponent } from 'src/app/pages/user-list/add-user/add-user.component';
import { EditUserComponent } from 'src/app/pages/user-list/edit-user/edit-user.component';
import { ViewUserComponent } from 'src/app/pages/user-list/view-user/view-user.component';
import { ImportAttendanceLogComponent } from 'src/app/pages/import-attendance-log/import-attendance-log.component';
import { FileUploadModule } from 'ng2-file-upload';

export const MY_DATE_FORMATS ={
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
}


@NgModule({
  declarations: [
    DashboardsComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
    ViewUserComponent,
    ImportAttendanceLogComponent,
  ],
  imports: [
    FileUploadModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Bootstrap Modules
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),

    //Others
    CountToModule,
  ],
  exports: [
    FileUploadModule,
  ],

  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS 
    },
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ]
})
export class AdminLayoutModule { }
