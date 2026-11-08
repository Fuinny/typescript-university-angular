import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-client-new',
  styleUrl: './client-new.css',
  templateUrl: './client-new.html',
})
export class ClientNew {
  public newClientForm: FormGroup;

  constructor() {
    this.newClientForm = new FormGroup({
      'company_name': new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      'company_code': new FormControl(null, [
        Validators.pattern(/^[0-9]+$/)
      ]),
      'vat_reg_number': new FormControl(null, [
        Validators.pattern(/^(LT)?[0-9]+$/)
      ]),
      'address': new FormControl(),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'telephone': new FormControl(null, [
        Validators.minLength(10),
        Validators.maxLength(12),
        Validators.pattern(/^\+370[0-9]+$/)
      ]),
      'contacts': new FormArray([
        this.createContact()
      ])
    });
  }

  get contacts() {
    return (this.newClientForm.get('contacts') as FormArray).controls;
  }

  private createContact(): FormGroup {
    return new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      position: new FormControl(null, Validators.required),
      telephone: new FormControl(null, Validators.required)
    });
  }

  public addContactField() {
    (this.newClientForm.get('contacts') as FormArray).push(
      new FormControl(null, [], [])
    );
  }

  public removeContactField() {
    (this.newClientForm.get('contacts') as FormArray).removeAt(-1);
  }

  public sumbitForm() {
    console.log(this.newClientForm.value);
  }
}
