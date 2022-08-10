import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { ImportLog } from 'src/app/_models/importLog';
import { ImportLogService } from 'src/app/_services/import-log.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-import-attendance-log',
  templateUrl: './import-attendance-log.component.html',
  styleUrls: ['./import-attendance-log.component.scss']
})
export class ImportAttendanceLogComponent implements OnInit {
  hasBaseDropZoneOver = false;
  uploader!: FileUploader;
  blob!: Blob;
  convert: string = "converted";
  upload: string = "uploaded";
  baseUrl = environment.apiUrl;
  formData!: FormData;
  loading: boolean = false;
  isConverted!: true;
  isSend!: true;
  errorMessage!: string;
  isChange: boolean = false;
  isError: boolean = false;

  elementData: ImportLog[] = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  sortColumn = "";
  sortDirection = "";
  pageSizeOptions: number[] = [5, 10 , 25, 100];

  displayedColumns: string[] = ['Id', 'Filename', 'Status', 'UploadedAt', 'Edit']
  dataSource: MatTableDataSource<ImportLog> = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private fb: FormBuilder, private importLogService: ImportLogService, private _liveAnnouncer: LiveAnnouncer, private toastr: ToastrService) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  announceSortChange(sortState: Sort){
    if(sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
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
    this.dataSource.filterPredicate = (data: ImportLog, filter: string): boolean => {
      return (
        data.Filename.toLocaleLowerCase().includes(filter)
      )
    }
  }

  ngOnInit(): void {
    this.initializeUploader();
    this.loadData();
  }

  
  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'ImportAttendanceLogs/import',
      headers: [{name: 'Authorization', value: 'Bearer '+ JSON.parse(localStorage.getItem('user') || '{}').Token}],
      itemAlias: 'Files',
      isHTML5: true,
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    console.log(this.uploader)

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onCompleteItem = (item, response, status, headers) => {
      if (response) {
        let result = JSON.parse(response);
        console.log(result)
        if(result.File){
          this.isError = !this.isError;
          this.errorMessage = result.File[0];
        }
        console.log(result.Errors)
        if(result.Errors){
          this.isError = !this.isError;
          this.errorMessage = result.Errors[0];
        }
        this.ngOnInit();
      }
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  loadData() {
    this.isLoading = true;
    let URL = `${this.baseUrl}ImportAttendanceLogs?page=${this.currentPage + 1}&limit=${this.pageSize}&sortColumn=${this.sortColumn}&sortDirection=${this.sortDirection}`
    console.log(URL);

    fetch(URL, {
        headers: new Headers({
          'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('user') || '{}').Token
        })
    })
      .then(response => response.json())
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
  
  onChange(event: any) {
    console.log(event.target.result)
    if(!this.isChange){
      this.isChange = true
    }
    if(this.isError == true){
      this.isError = false;
    }
    const files: FileList = event.target.files;
    this.formData = new FormData();
    for(let index = 0; index < files.length; index++) {
      console.log(files[index].name)
      const element = files[index];
      this.formData.append('Files', element);
    }
  }

  onUpload() {
      for(let index = 0; index < this.uploader.queue.length; index++) {
        let data = new FormData();
        const element = this.uploader.queue[index]._file;
        data.append('Files', element);
        console.log(data)
        this.importLogService.upload(data).subscribe(
          (d) => {
            this.toastr.success("Imported Succesfully");
            this.ngOnInit();
          },
          (error) => {
            // this.isError = !this.isError;
            // error.error.File.map((error: any) => {
            //   this.errorMessage = error;
            // })
            console.log(error)
          }
      );
      }

  }

  convertFile(id: number) {
    this.importLogService.convertFile(id).subscribe(
      (response) => {
        this.toastr.success("Converted Successfully");
        this.ngOnInit();
      }, 
      (error) => {
        this.toastr.error("Failed");
        console.log(error);
      }
    )
  }

  downloadFile(id: number, name: string){
    this.importLogService.downloadFile(id).subscribe((data) => {

      this.blob = new Blob([data], {type: 'text/json'});
    
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = JSON.stringify(name).split('\\').pop() || '';
      link.click();
    
    })
  }

  reUpload(id: number){
    this.importLogService.reUpload(id).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      error => {
        console.log(error)
      }
    )
  }
}
