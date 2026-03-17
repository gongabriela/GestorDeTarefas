import { Injectable,  } from '@angular/core';
import { IUser } from '../models/user';
import { environment } from '../../environments/environment';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {
  
  private supabase: SupabaseClient;
  private userSubject = new BehaviorSubject<IUser | null>(null);
  
  currentUser$ = this.userSubject.asObservable();
  
  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.getSession().then(({ data: { session } }) => {
      this.userSubject.next(this.mapSupabaseUserToIUser(session?.user || null));
    });

    this.supabase.auth.onAuthStateChange((event, session) => {
      this.userSubject.next(this.mapSupabaseUserToIUser(session?.user || null));
    });
  }

  private mapSupabaseUserToIUser(supabaseUser: User | null): IUser | null {
    if (!supabaseUser) return null;
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata['full_name'] || 'Utilizador'
    };
  }

  async register(email: string, password: string, name: string): Promise<IUser> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name } 
      }
    });
    
    if (error) throw error; 
    if (!data.user) throw new Error('Erro ao criar utilizador');

    return this.mapSupabaseUserToIUser(data.user)!;
  }

  async login(email: string, password: string): Promise<IUser> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    if (!data.user) throw new Error('Utilizador não encontrado');

    return this.mapSupabaseUserToIUser(data.user)!;
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

}

/**
 *   editProfile(id: number, name: string, email: string): Observable<IUser> {
    const updatedUser: Partial<IUser> = { name, email };
    return this.http.patch<IUser>(`${this.API_URL}/${id}`, updatedUser);
  }
  
  deleteProfile(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

 */