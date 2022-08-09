import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportLogService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  convertFile(id: number) {
    return this.http.get(this.baseUrl + 'ImportAttendanceLogs/' + id);
  }

  downloadFile(id: number) {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get<Blob>(this.baseUrl + 'ImportAttendanceLogs/Download/' + id, httpOptions)
  }

  upload(Files: FormData): Observable<any>{
    Files.forEach((value,key) => {
      console.log(key+" "+value)
    });
    
    // Store form name as "file" with file data
      
    // Make http post request over api
    // with Files as req
    return this.http.post(this.baseUrl + 'ImportAttendanceLogs/import' , Files)
  }

  reUpload(id: number) {
    return this.http.get(this.baseUrl + 'ImportAttendanceLogs/Upload/' + id)
  }
}
