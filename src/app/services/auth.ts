import { Injectable,  } from '@angular/core';
import { IUser } from '../models/user';
import { environment } from '../../environments/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })

export class AuthService {
  
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
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

    const newUser: IUser = {
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata['full_name']
    };

    return newUser;
  }

  async login(email: string, password: string): Promise<IUser> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    if (!data.user) throw new Error('Utilizador não encontrado');

    const loggedInUser: IUser = {
      id: data.user.id,
      email: data.user.email || '',
      name: data.user.user_metadata['full_name'] || 'Utilizador'
    };

    return loggedInUser;
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