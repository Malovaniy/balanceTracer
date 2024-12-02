import { Component, Input } from '@angular/core';
import { Transaction } from '../../models/transaction.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./transaction-list.component.scss'],
})
export class TransactionListComponent {
  @Input() transactions: Transaction[] = [];
  @Input() categories: string[] = [];

  selectedCategory: string = 'All';
  selectedType: string = 'All';
  sortOption: string = 'date';
  sortDirection: string = 'asc';

  get filteredTransactions(): Transaction[] {
    let filtered = this.transactions;
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter((t) => t.category === this.selectedCategory);
    }
    if (this.selectedType !== 'All') {
      filtered = filtered.filter(
        (t) => t.type === this.selectedType.toLowerCase()
      );
    }
    filtered = filtered.sort((a, b) => {
      let compareValue = 0;
      if (this.sortOption === 'date') {
        compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (this.sortOption === 'amount') {
        compareValue = a.amount - b.amount;
      }
      return this.sortDirection === 'asc' ? compareValue : -compareValue;
    });
    return filtered;
  }

  get balance(): number {
    return this.filteredTransactions.reduce(
      (acc, t) => acc + Number(t.amount),
      0
    );
  }
}
