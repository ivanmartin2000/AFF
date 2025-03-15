import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, LoginRequest } from '../auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  loginForm: FormGroup;
  errorMessage = '';
  showPopup = false;
  popupMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    
    const request: LoginRequest = this.loginForm.value;
    this.authService.login(request).subscribe({
      next: (response) => {
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
        if (response.nivel === 1) {
          this.router.navigate(['/app/dashboard']);
        } else {
          this.router.navigate(['/app/menu-principal']);
        }
      },
      error: (err) => {
        console.error(err);
        this.popupMessage = err.status === 401
          ? 'Correo o contraseña incorrectos.'
          : 'Error al iniciar sesión. Inténtalo de nuevo.';
        this.showPopup = true;
      }
    });
  }

  closePopup() {
    this.showPopup = false;
    this.popupMessage = '';
  }
}
