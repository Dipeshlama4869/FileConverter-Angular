import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addForm!: FormGroup;
  Name: string = '';
  PhoneNumber!: string;
  Email!: string;
  Username!: string;
  Password!: string;
  PasswordConfirmation!: string;
  title: string = '';
  EmailError: string = '';
  isEmailError: boolean = false;
  UsernameError: string = '';
  isUsernameError: boolean = false;
  id!: number;

  constructor(private userService: UserService, private fb: FormBuilder, private dialogRef: MatDialogRef<AddUserComponent>, @Inject(MAT_DIALOG_DATA) data: any) { 
    this.Name = data.Name;
    this.PhoneNumber = data.PhoneNumber;
    this.Email = data.Email;
    this.Username = data.Username;
    this.Password = data.Password;
    this.PasswordConfirmation = data.PasswordConfirmation;
    this.title = data.title;
    this.id = data.id;
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      Name: [this.Name, Validators.required],
      PhoneNumber: [this.PhoneNumber, [Validators.minLength(10), Validators.maxLength(10)]],
      Email: [this.Email],
      Username: [this.Username, Validators.required],
      Password: [this.Password, Validators.required],
      PasswordConfirmation: [this.PasswordConfirmation, [Validators.required]],
    },{
      validators: this.matchValues('Password', 'PasswordConfirmation')
    });
  }

  close() {
    this.dialogRef.close();
  }

  matchValues(password: string, confirmPassword: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const pass = controls.get(password);
      const confPass = controls.get(confirmPassword);
      if (confPass?.errors && !confPass.errors['matching']) {
        return null;
      }
      if (pass?.value !== confPass?.value) {
        controls.get(confirmPassword)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  submit(){
    console.log(this.addForm.value)
    this.userService.addUser(this.addForm.value).subscribe(
      res => {
      console.log(this.addForm.value)
      this.dialogRef.close();
      location.reload();
      },
      error => {
        console.log(this.addForm.value)
        console.log(error)
        const errorContent = error.error
        if(errorContent.Email){
          this.isEmailError = !this.isEmailError;
          this.EmailError = errorContent.Email[0];
        };
      }
    )
    }
}
