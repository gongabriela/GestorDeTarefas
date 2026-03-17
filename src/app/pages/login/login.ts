import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm!: FormGroup;
  isRegisterMode = false;
  apiErrorMessage = ''; 
  cdr = inject(ChangeDetectorRef); //APAGAR garante que apareca o erro de invalid credentials

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['']
    });
  }

  // Alterna entre Login e Registo
  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.apiErrorMessage = '';
    this.loginForm.reset(); 

    const nameControl = this.loginForm.get('name');
    if (this.isRegisterMode) 
      nameControl?.setValidators([Validators.required, Validators.minLength(2)]);
    else 
      nameControl?.clearValidators();
    nameControl?.updateValueAndValidity();
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  async onSubmit(): Promise<void> {
    this.apiErrorMessage = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    try {
      if (this.isRegisterMode)
        await this.handleRegistration();
      else
        await this.handleLogin();
      await this.router.navigate(['/']);
    } catch (error: unknown) {
      this.handleAuthError(error);
      this.cdr.markForCheck(); //APAGAR garante que apareca o erro de invalid credentials
    }
  }

  private async handleRegistration(): Promise<void> {
    const { email, password, name } = this.loginForm.value;
    await this.authService.register(email, password, name);
  }

  private async handleLogin(): Promise<void> {
    const { email, password } = this.loginForm.value;
    await this.authService.login(email, password);
  }

  private handleAuthError(error: unknown): void {
    if (error instanceof Error) {
      this.apiErrorMessage = error.message;
    }
    else if (typeof error === 'string') {
      this.apiErrorMessage = error;
    }
    else {
      this.apiErrorMessage = 'An unknown error occurred.';
    }
  }

}