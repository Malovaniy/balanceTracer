import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Transaction } from './models/transaction.model';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [TransactionListComponent, TransactionFormComponent],
})
export class AppComponent implements OnInit {
  transactions: Transaction[] = [];
  categories = ['Groceries', 'Salary', 'Entertainment', 'Bills', 'Other'];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.transactions = this.storageService.getTransactions();
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
    this.storageService.saveTransactions(this.transactions);
  }
}
