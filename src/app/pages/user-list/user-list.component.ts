import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Register } from 'src/app/_models/register';
import { User } from 'src/app/_models/user';
import { DialogService } from 'src/app/_services/dialog.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  baseUrl = environment.apiUrl;
  show: boolean = false;
  id!: number;
  editForm!: FormGroup;
  user!: Register;
  validationError: string[] = [];

  elementData: User[] =[];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  sortColumn = "";
  sortDirection = "";
  pageSizeOptions: number[] = [5, 10 , 25, 100];

  displayedColumns: string[] = ['Id', 'Name', 'UserName', 'Email', 'PhoneNumber', 'Edit']
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private dialog: MatDialog, private liveAnnouncer: LiveAnnouncer, private dialogService: DialogService, private userService: UserService, private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
 
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
  
  applyFilter(event: Event): void {
    const filter = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    this.dataSource.filter = filter;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterTable() {
    this.dataSource.filterPredicate = (data: User, filter: string): boolean => {
      return (
        data.Name.toLocaleLowerCase().includes(filter)
      )
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  initializeForm() {
    this.editForm = this.fb.group({
      Name: [this.user.Name, Validators.required],
      PhoneNumber: [this.user.PhoneNumber],
      Email: [this.user.Email, Validators.email],
      Username: [this.user.Username, Validators.required],
      Password: ['', Validators.required],
      PasswordConfirmation: ['', Validators.required],
    })
  }

  loadData() {
    this.isLoading = true;
    let URL = `${this.baseUrl}Users?page=${this.currentPage + 1}&limit=${this.pageSize}&sortDirection=${this.sortDirection}`

    fetch(URL, {
      headers: new Headers({
        'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('user') || '{}').Token
      })
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      this.dataSource.data = data.Data;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = data.TotalCount;
      })
      console.log(data.Data)
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  openAdd(){
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: '1000px',
      width: '600px',
      data: {
        title: 'Add User',
      },
      position: {
        'top': '0',
        right: '0',
      }
    });

    dialogRef.afterClosed().subscribe(
      (data:any) => console.log("Dialog output:", data)
    );
  }

  openEdit(id: number){
    this.userService.getUser(id)
    .subscribe(
      res => {
        console.log(res)
        const dialogRef = this.dialog.open(EditUserComponent, {
          height: '1000px',
          width: '600px',
          data: {
            id: id,
            title: 'Edit User',
            Email: res.User.Email,
            PhoneNUmber: res.User.PhoneNUmber,
            Name: res.User.Name,
            Username: res.User.UserName,
          },
          position: {
            'top': '0',
            right: '0',
          }
        });

        dialogRef.afterClosed().subscribe(
          (data: any) => console.log("Dialog output:", data)
        );
      }
    )
  }

  openView(id: number){
    this.userService.getUser(id)
    .subscribe(
      res => {
        const dialogRef = this.dialog.open(ViewUserComponent, {
          height: '1000px',
          width: '600px',
          data: {
            id: id,
            title: 'Details',
            Email: res.User.Email,
            PhoneNUmber: res.User.PhoneNUmber,
            Name: res.User.Name,
            Username: res.User.UserName,
          },
          position: {
            'top': '0',
            right: '0',
          }
        });

        dialogRef.afterClosed().subscribe(
          (data: any) => console.log("Dialog output:", data)
        );
      }
    )
  }

    delete(id: number) {
      console.log(id)
      this.dialogService.openConfirmDialog('Are you sure to Delete this record?').afterClosed().subscribe(res => {
        if(res){
          this.userService.deleteUser(id).subscribe(
            () => {
            this.toastr.success('Deleted Successfully'),
            this.ngOnInit()
          }
          )
        }
      });

    }
}
