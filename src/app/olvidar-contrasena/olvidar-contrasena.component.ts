import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-olvidar-contrasena',
  templateUrl: './olvidar-contrasena.component.html',
  styleUrls: ['./olvidar-contrasena.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class OlvidarContrasenaComponent {
  popupVisible = false;

  email = '';
  codigo = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private router: Router) {}

  openPasswordReset(): void {
    // Aquí podrías validar el email y código antes de abrir el popup
    this.popupVisible = true;
  }

  redirectToLogin(): void {
    // Redirige a la ruta de login en tu aplicación Angular
    // Ajusta '/auth' o '/login' según tu configuración de rutas
    this.router.navigate(['/auth']);
  }
}
