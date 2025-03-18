import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService, UsuarioPerfil } from '../perfil.service'; // Asegúrate de tener este servicio implementado
import { UsuariosService } from '@app/usuarios.service';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [UsuariosService],
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit, OnDestroy {
  // Datos del usuario cargados desde el backend
  usuario!: UsuarioPerfil;
  username: string = '';
  email: string = '';
  addresses: any[] = []; // Se pueden definir interfaces para las direcciones
  cards: any[] = [];     // Igual para las tarjetas
  idUsuario: number | null = null;  // Almacenamos el ID del usuario

  popupVisible: boolean = false;

  // Variables para el ABM de tarjetas
  cardForm: FormGroup;
  showCardModal: boolean = false;
  editingCardIndex: number | null = null;
  
  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private perfilService: PerfilService,
    private usuariosService: UsuariosService
  ) {
    // Definir el formulario para las tarjetas
    this.cardForm = this.fb.group({
      numeroTarjeta: ['', Validators.required],
      titular: ['', Validators.required],
      fechaExpiracion: ['', Validators.required],
      cvv: [''],
      tipoTarjeta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Primero, obtener el ID del usuario
    this.usuariosService.getUserIdFromBackend().subscribe({
      next: (idUsuario) => {
        console.log("ID del usuario obtenido:", idUsuario);
        this.idUsuario = idUsuario;  
  
        if (this.idUsuario !== null) {
          this.perfilService.getPerfilUsuario(this.idUsuario).subscribe({
            next: (data) => {
              const usuario = data.usuario;  
            
              console.log("Usuario:", usuario);
              console.log("Direcciones:", data.direcciones);
              console.log("Tarjetas:", data.tarjetas);
            
              this.username = usuario.nombres + ' ' + usuario.apellidos;  
              this.email = usuario.correo;  
            
              this.addresses = data.direcciones ?? [];
              this.cards = data.tarjetas ?? [];
            },
            
            error: (err) => {
              console.error('Error al obtener perfil:', err);
            }
          });
        }
      },
      error: (err) => {
        console.error("Error al obtener el ID del usuario:", err);
      }
    });
  }
  

  ngOnDestroy(): void {
    // Aquí puedes limpiar suscripciones si fuese necesario
  }

  goToMenuPrincipal(): void {
    this.router.navigate(['/app/menu-principal']);
  }

  openPopup(): void {
    this.popupVisible = true;
  }
  
  closePopup(): void {
    this.popupVisible = false;
  }

  // Método para abrir el modal de tarjetas sin usar arrow functions en el template
  editSelectedCard(): void {
    const index = this.cards.findIndex(card => card.selected);
    if (index !== -1) {
      this.openCardModal(this.cards[index], index);
    } else {
      console.error("No hay tarjeta seleccionada para editar.");
    }
  }

  openCardModal(card?: any, index?: number): void {
    if (card) {
      this.editingCardIndex = index ?? null;
      this.cardForm.patchValue(card); // Rellenar el formulario con los valores de la tarjeta
    } else {
      this.editingCardIndex = null;
      this.cardForm.reset(); // Resetear el formulario si no se está editando una tarjeta
    }
    this.showCardModal = true;
  }

  closeCardModal(): void {
    this.showCardModal = false;
  }

  saveCard(): void {
    if (this.cardForm.invalid) return;
    const cardData = this.cardForm.value;

    if (this.editingCardIndex !== null) {
      // Actualiza la tarjeta existente en el array local
      this.cards[this.editingCardIndex] = { ...cardData, selected: false };
      // Aquí podrías llamar a un servicio para actualizar la tarjeta en el backend
    } else {
      // Agrega una nueva tarjeta al array local
      this.cards.push({ ...cardData, selected: false });
      // Llama a un servicio para agregar la tarjeta en el backend
    }
    this.closeCardModal();
  }

  deleteSelectedCards(): void {
    this.cards = this.cards.filter(card => !card.selected);
    // También llama a un servicio para eliminar en el backend, si fuera necesario.
  }

  // Getter para saber si hay alguna tarjeta seleccionada (evita expresiones en el template)
  get isCardSelected(): boolean {
    return this.cards && this.cards.some(card => card.selected);
  }
}
