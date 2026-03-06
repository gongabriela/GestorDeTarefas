import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DeleteModalService {  
  
  isOpen = false;
  message = '';

  private confirmSubject = new Subject<boolean>();
  confirm$: Observable<boolean> = this.confirmSubject.asObservable();

  constructor() {}

  openConfirm(message: string): Observable<boolean> {
    this.message = message;
    this.isOpen = true;
    return this.confirm$;
  }

  closeConfirm(result: boolean) {
    this.isOpen = false;
    this.confirmSubject.next(result);
  }
}
