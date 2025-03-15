// src/app/crear-cuenta/crear-cuenta.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosService, RegistroRequest } from '../usuarios.service';

@Component({
  selector: 'app-crear-cuenta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.scss']
})
export class CrearCuentaComponent implements OnInit {
  registroForm: FormGroup;
  submitted = false;
  errorMessage = '';
  passwordVisible = false;
  confirmPasswordVisible = false;
  showPopup = false;
  
  // Para almacenar el archivo seleccionado (DNI)
  dniFile: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService
  ) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      esCreador: [false], // Nuevo control para el switch
      socialAccount: [''] // Control para la cuenta verificada
    }, {
      validators: this.passwordMatchValidator.bind(this)
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      if (confirmPasswordControl?.hasError('passwordMismatch')) {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  get f() {
    return this.registroForm.controls;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registroForm.invalid) {
      return;
    }

    // Si el usuario es creador de contenido, mostramos el pop-up para cargar DNI y socialAccount
    if (this.registroForm.get('esCreador')?.value) {
      this.showPopup = true;
      return;
    }

    // Llamar al servicio de registro
    const registroData: RegistroRequest = {
      nombre: this.registroForm.get('nombre')?.value,
      apellido: this.registroForm.get('apellido')?.value,
      correo: this.registroForm.get('email')?.value,
      clave: this.registroForm.get('password')?.value,
      esCreador: this.registroForm.get('esCreador')?.value,
      socialAccount: this.registroForm.get('socialAccount')?.value,
      // Puedes enviar también la descripción si es necesario
    };

    this.usuariosService.register(registroData).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        // Redirigir a la página de login después de un registro exitoso
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error al registrar el usuario:', err);
        this.errorMessage = err.error || "Error al registrar el usuario.";
      }
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.dniFile = file;
      console.log('Archivo DNI seleccionado:', file.name);
    }
  }

  closePopup() {
    this.showPopup = false;
    // Aquí podrías manejar los datos extra de creador, como subir el archivo y la cuenta social.
    console.log('Datos creador de contenido:', {
      dniFile: this.dniFile,
      socialAccount: this.registroForm.get('socialAccount')?.value
    });
    // Luego continuar con el registro
    const registroData: RegistroRequest = {
      nombre: this.registroForm.get('nombre')?.value,
      apellido: this.registroForm.get('apellido')?.value,
      correo: this.registroForm.get('email')?.value,
      clave: this.registroForm.get('password')?.value,
      esCreador: this.registroForm.get('esCreador')?.value,
      socialAccount: this.registroForm.get('socialAccount')?.value,
    };
    this.usuariosService.register(registroData).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error al registrar el usuario:', err);
        this.errorMessage = err.error || "Error al registrar el usuario.";
      }
    });
  }

  resetForm() {
    this.submitted = false;
    this.registroForm.reset();
  }
}
