// src/app/countdown.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown',
  pure: false  // Debe ser impuro para actualizarse con el tiempo
})
export class CountdownPipe implements PipeTransform {
  transform(value: string | Date): string {
    const endDate = new Date(value);
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    if (diff <= 0) {
      return 'Finalizada';
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}
