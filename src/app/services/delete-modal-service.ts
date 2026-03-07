import { Injectable } from '@angular/core';
import { Observable, Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteModalService {

  isOpen = false;
  message = '';

  private confirmSubject = new Subject<boolean>();

  openConfirm(message: string): Observable<boolean> {
    this.message = message;
    this.isOpen = true;
    this.confirmSubject = new Subject<boolean>();
    return this.confirmSubject.pipe(take(1));
  }

  closeConfirm(result: boolean) {
    this.isOpen = false;
    this.confirmSubject.next(result);
  }
}
