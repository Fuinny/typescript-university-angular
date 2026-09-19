import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [FormsModule, CommonModule],
  selector: 'app-bmi-calculator',
  styleUrl: './bmi-calculator.css',
  templateUrl: './bmi-calculator.html'
})
export class BmiCalculator {
  weight: number | null = null;
  height: number | null = null;
  bmi: number | null = null;
  weightCategory: string = '';

  calculateBMI(): void {
    if (this.weight && this.height && this.weight > 0 && this.height > 0) {
      const heightInMeters = this.height / 100;
      const tempBMIValue = this.weight / (heightInMeters * heightInMeters);
      this.bmi = parseFloat(tempBMIValue.toFixed(1));
      this.setCategory();
    } else {
      this.bmi = null;
      this.weightCategory = '';
    }
  }

  setCategory(): void {
    if (!this.bmi)
      return;

    if (this.bmi < 18.5) {
      this.weightCategory = 'Underweight';
    } else if (this.bmi < 25) {
      this.weightCategory = 'Normal weight';
    } else if (this.bmi < 30) {
      this.weightCategory = 'Overweight';
    } else {
      this.weightCategory = 'Obese';
    }
  }

  getBadgeClass(): string {
    switch (this.weightCategory) {
      case 'Underweight': return 'bg-warning text-dark';
      case 'Normal weight': return 'bg-success';
      case 'Overweight': return 'bg-warning text-dark';
      case 'Obese': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
