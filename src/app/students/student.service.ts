import { Injectable } from '@angular/core';
import { Student } from './student';
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsUrl = '/api/attendance';

  constructor(private http: Http) {}

  getStudents(): Promise<void | Student[]> {
    return this.http.get(this.studentsUrl)
                .toPromise()
                .then(response => response.json() as Student[])
                .catch(this.handleError);
  }

  createStudent(newStudent: Student): Promise<void | Student> {
    return this.http.post(this.studentsUrl, newStudent)
                    .toPromise()
                    .then(response => response.json() as Student)
                    .catch(this.handleError);
  }

  deleteStudent(deleteStudentID: String): Promise<void | String> {
    return this.http.delete(this.studentsUrl + '/' + deleteStudentID)
                    .toPromise()
                    .then(response => response.json() as String)
                    .catch(this.handleError);
  }

  updateStudent(putStudent: Student): Promise<void | Student> {
    var putUrl = this.studentsUrl + '/' + putStudent._id;
    return this.http.put(putUrl, putStudent)
                    .toPromise()
                    .then(response => response.json() as Student)
                    .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
    console.error(errMsg); // log to console instead
  }

}