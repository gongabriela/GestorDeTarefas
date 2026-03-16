import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Agora importamos as ferramentas de Reactive Forms em vez de FormsModule
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- Muito importante estar aqui!
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  // --- AS FERRAMENTAS ---
  private fb = inject(FormBuilder); // Construtor de formulários
  private authService = inject(AuthService);
  private router = inject(Router);

  // --- AS VARIÁVEIS DO ECRÃ ---
  loginForm!: FormGroup; // O formulário (muda de taskForm para loginForm no HTML!)
  isRegisterMode = false;
  apiErrorMessage = ''; // Para mostrar se a conta não existir

  // --- PREPARAÇÃO (Corre quando o ecrã abre) ---
  ngOnInit(): void {
    // Aqui construímos as regras das caixas de texto
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''] // Deixamos vazio. Só vamos exigir o nome se for Registo.
    });
  }

  // --- FUNÇÕES DOS BOTÕES ---

  // Alterna entre Login e Registo (precisas de criar este botão no HTML!)
  toggleMode(): void {
    this.isRegisterMode = !this.isRegisterMode;
    this.apiErrorMessage = ''; // Limpa os erros ao trocar
  }

  // Botão do X ou "Cancel"
  onCancel(): void {
    this.router.navigate(['/']); // Manda o utilizador de volta para a página principal
  }

  // Quando clicam no botão azul principal
  onSubmit(): void {
    this.apiErrorMessage = '';

    // Se o formulário tiver erros (ex: email inválido), a função para aqui!
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Fica tudo vermelho para o utilizador ver
      return;
    }

    // Tiramos os valores das caixas de texto
    const email = this.loginForm.value.email;
    const name = this.loginForm.value.name;

    if (this.isRegisterMode) {
      // REGISTO
      this.authService.register(name, email).subscribe({
        next: () => this.router.navigate(['/']), // Sucesso: vai para as tarefas
        error: () => this.apiErrorMessage = 'Ocorreu um erro ao criar a conta.'
      });
    } else {
      // LOGIN
      this.authService.login(email).subscribe({
        next: (users) => {
          if (users.length > 0) {
            this.router.navigate(['/']); // Sucesso: encontrou conta!
          } else {
            this.apiErrorMessage = 'Não existe nenhuma conta com este email.';
          }
        },
        error: () => this.apiErrorMessage = 'Erro de ligação ao servidor.'
      });
    }
  }
}