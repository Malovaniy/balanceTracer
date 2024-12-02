import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { v4 as uuidv4 } from 'uuid';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  imports: [ReactiveFormsModule, NgClass],
  standalone: true,
})
export class TransactionFormComponent {
  @Output() transactionAdded = new EventEmitter<Transaction>();
  @Input() categories: string[] = [];

  transactionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      name: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      type: ['income', Validators.required],
      category: ['', Validators.required],
      date: [new Date().toISOString().split('T')[0], Validators.required],
    });
  }

  addTransaction(): void {
    if (this.transactionForm.valid) {
      const transaction: Transaction = {
        id: uuidv4(),
        ...this.transactionForm.value,
      };
      this.transactionAdded.emit(transaction);
      this.transactionForm.reset({
        type: 'income',
        date: new Date().toISOString().split('T')[0],
      });
    }
  }
}
