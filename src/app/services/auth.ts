import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthService {
  
  private http = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/users`;

  register(name: string, email: string): Observable<IUser> {
    const newUser: IUser = { 
      id: Date.now(), 
      name: name, 
      email: email 
    };
    return this.http.post<IUser>(this.API_URL, newUser);
  }

  login(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.API_URL}?email=${email}`);
  }

  editProfile(id: number, name: string, email: string): Observable<IUser> {
    const updatedUser: Partial<IUser> = { name, email };
    return this.http.patch<IUser>(`${this.API_URL}/${id}`, updatedUser);
  }
  
  deleteProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

}