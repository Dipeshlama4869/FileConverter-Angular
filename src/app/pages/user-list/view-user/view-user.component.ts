import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  Name: string = '';
  PhoneNumber!: string;
  Email!: string;
  Username!: string;
  title: string = '';
  id!: number;

  constructor(private dialogRef: MatDialogRef<ViewUserComponent>, @Inject(MAT_DIALOG_DATA) data: any) { 
    this.Name = data.Name;
    this.PhoneNumber = data.PhoneNumber;
    this.Email = data.Email;
    this.Username = data.Username;
    this.title = data.title;
    this.id = data.id;
  }
  ngOnInit(): void {
  }

}
