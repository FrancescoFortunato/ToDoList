import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, HttpCustomResponse, HttpStandard } from '@core/models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private logUrl = '';
  constructor(private http: HttpClient) {}

  getListTask(): Observable<Task[]> {
    const completeUrl = this.logUrl + 'assets/mokked/tasks.json';
    return this.http.get<HttpCustomResponse>(completeUrl).pipe(
      map((response) => {
        return HttpStandard.extractData(response);
      }),
      catchError((error) => {
        return HttpStandard.handleError(error);
      })
    );
  }

  getStatuses(): Observable<string[]> {
    const completeUrl = this.logUrl + 'assets/mokked/statues.json';
    return this.http.get<HttpCustomResponse>(completeUrl).pipe(
      map((response) => {
        return HttpStandard.extractData(response);
      }),
      catchError((error) => {
        return HttpStandard.handleError(error);
      })
    );
  }

  addTask(task: Task): Observable<string[]> {
    const completeUrl = this.logUrl + 'assets/mokked/addTask.json';
    //when connet backend change method in POST
    return this.http.get<HttpCustomResponse>(completeUrl).pipe(
      map((response) => {
        return HttpStandard.extractData(response);
      }),
      catchError((error) => {
        return HttpStandard.handleError(error);
      })
    );
  }

  changeTask(task: Task): Observable<string[]> {
    const completeUrl = this.logUrl + 'assets/mokked/changeTask.json';
    //when connet backend change method in PUT
    return this.http.get<HttpCustomResponse>(completeUrl).pipe(
      map((response) => {
        return HttpStandard.extractData(response);
      }),
      catchError((error) => {
        return HttpStandard.handleError(error);
      })
    );
  }

  deleteTask(task: Task): Observable<string[]> {
    const completeUrl = this.logUrl + 'assets/mokked/deleteTask.json';
    //when connet backend change method in DELETE
    return this.http.get<HttpCustomResponse>(completeUrl).pipe(
      map((response) => {
        return HttpStandard.extractData(response);
      }),
      catchError((error) => {
        return HttpStandard.handleError(error);
      })
    );
    return null;
  }
}
