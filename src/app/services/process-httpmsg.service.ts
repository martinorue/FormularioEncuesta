import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessHttpmsgService {

  // public handleError(error: HttpErrorResponse | any){
  //   let errMsg: string;

  //   if(error.error instanceof ErrorEvent){
  //     errMsg = error.error.message;
  //   }else{
  //     errMsg = `${error.status} - ${error.statusText || ''}`; 
  //   }

  //   return throwError(errMsg);
  // }

  constructor(private messageService: MessageService) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        this.messageService.showError('Error de conexión', 'top right');
      } else {
        if (error.status === 401) {
          this.messageService.showError(error.error['Message'], 'top right');
        }if(error.status == 400){
          this.messageService.showError(error.error['Message'], 'top right');
        } 
        else {
          this.messageService.showError('Error de servidor', 'top right');
        }
      }
    } else {
      this.messageService.showError('Error', 'top right');
    }
    return throwError(error);
  }
}
