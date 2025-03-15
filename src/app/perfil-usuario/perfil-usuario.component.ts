import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PerfilService, UsuarioPerfil } from '../perfil.service'; // Asegúrate de tener este servicio implementado

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
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

  popupVisible: boolean = false;

  // Variables para el ABM de tarjetas
  cardForm: FormGroup;
  showCardModal: boolean = false;
  editingCardIndex: number | null = null;
  
  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private perfilService: PerfilService
  ) {
    this.cardForm = this.fb.group({
      numeroTarjeta: ['', Validators.required],
      titular: ['', Validators.required],
      fechaExpiracion: ['', Validators.required],
      cvv: [''],
      tipoTarjeta: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Cargar la información real del usuario desde el backend
    this.perfilService.getPerfilUsuario().subscribe({
      next: (data) => {
        // Asignar datos del usuario
        this.usuario = data;
        this.username = data.nombres + ' ' + data.apellidos;
        this.email = data.correo;
        // Asignar direcciones y tarjetas si se incluyen en el objeto, o bien dejar arrays vacíos
        this.addresses = data.direcciones ?? [];
        this.cards = data.tarjetas ?? [];
      },
      error: (err) => {
        console.error('Error al obtener perfil:', err);
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
      this.cardForm.patchValue(card);
    } else {
      this.editingCardIndex = null;
      this.cardForm.reset();
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
