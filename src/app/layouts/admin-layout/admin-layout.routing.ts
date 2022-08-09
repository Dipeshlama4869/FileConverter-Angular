import { Routes } from '@angular/router';
import { DashboardsComponent } from 'src/app/pages/dashboards/dashboards.component';
import { ImportAttendanceLogComponent } from 'src/app/pages/import-attendance-log/import-attendance-log.component';
import { UserListComponent } from 'src/app/pages/user-list/user-list.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardsComponent },

    //User pages
    { path: 'user', component: UserListComponent },

    //import log pages
    { path: 'import-attendance-log', component: ImportAttendanceLogComponent }

];
