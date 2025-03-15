// src/app/perfil-publico/perfil-publico.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PerfilService, UsuarioPerfil } from '../perfil.service';

@Component({
  selector: 'app-perfil-publico',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './perfil-publico.component.html',
  styleUrls: ['./perfil-publico.component.scss']
})
export class PerfilPublicoComponent implements OnInit {
  usuario!: UsuarioPerfil;

  constructor(
    private route: ActivatedRoute,
    private perfilService: PerfilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.queryParamMap.get('id') || this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.perfilService.getPerfilPublico(id).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (err) => console.error('Error al cargar perfil público:', err)
      });
    } else {
      console.error('No se proporcionó id en la URL');
    }
  }

  goToMenuPrincipal(): void {
    this.router.navigate(['/app/menu-principal']);
  }
}
