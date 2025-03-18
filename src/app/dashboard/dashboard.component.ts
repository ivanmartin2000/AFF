import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardData } from '../dashboard.service';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data?: DashboardData;
  errorMessage = '';

  // Control para popup
  showChartPopup = false;
  activeMetric: string | null = null;

  // Chart reference
  @ViewChild('chartCanvas') chartCanvasRef!: ElementRef<HTMLCanvasElement>;
  chartInstance: Chart | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => {
        console.error('Error al cargar dashboard:', err);
        this.errorMessage = 'Error al cargar datos del dashboard.';
      }
    });
  }

  onMetricClick(metric: string): void {
    this.activeMetric = metric;
    this.showChartPopup = true;
    setTimeout(() => this.initChart(), 0);
  }

  closeChartPopup(): void {
    this.showChartPopup = false;
    this.activeMetric = null;
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }

  initChart(): void {
    if (!this.chartCanvasRef || !this.activeMetric || !this.data) return;

    const ctx = this.chartCanvasRef.nativeElement.getContext('2d');
    if (!ctx) return;

    // Destruir chart previo
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    let chartType: ChartType = 'bar';
    let labels: string[] = [];
    let values: number[] = [];
    let chartLabel = '';

    switch (this.activeMetric) {
      case 'monthlyVentas':
        chartType = 'bar';
        chartLabel = 'Ventas Mensuales';
        labels = this.data.monthlyVentas.map(m => m.monthLabel);
        values = this.data.monthlyVentas.map(m => m.total);
        break;
      case 'monthlyProductos':
        chartType = 'line';
        chartLabel = 'Productos Vendidos por Mes';
        labels = this.data.monthlyProductos.map(m => m.monthLabel);
        values = this.data.monthlyProductos.map(m => m.total);
        break;
      case 'monthlySubastas':
        chartType = 'doughnut';
        chartLabel = 'Subastas Finalizadas por Mes';
        labels = this.data.monthlySubastas.map(m => m.monthLabel);
        values = this.data.monthlySubastas.map(m => m.total);
        break;
      // etc. para otras métricas que quieras graficar
      default:
        chartType = 'bar';
        chartLabel = 'Métrica desconocida';
        labels = [];
        values = [];
        break;
    }

    this.chartInstance = new Chart(ctx, {
      type: chartType,
      data: {
        labels,
        datasets: [{
          label: chartLabel,
          data: values,
          backgroundColor: ['#647dee', '#7f53ac', '#a16ae8', '#d2c0fa', '#f1e0ff']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: chartLabel }
        }
      }
    });
  }
}
