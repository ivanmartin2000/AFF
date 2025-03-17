// Ejemplo en el servicio (upload.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = '/api/upload';

  constructor(private http: HttpClient) {}

  subirImagen(formData: FormData): Observable<{ rutaImagen: string }> {
    return this.http.post<{ rutaImagen: string }>(`${this.baseUrl}/imagen`, formData);
  }
}
