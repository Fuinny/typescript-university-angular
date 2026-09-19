import { Component, signal } from '@angular/core';
import { BmiCalculator } from './bmi-calculator/bmi-calculator';

@Component({
  imports: [BmiCalculator],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('bmi-calculator');
}
