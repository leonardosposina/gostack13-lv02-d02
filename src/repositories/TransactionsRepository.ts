import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface ResponseDTO {
  transactions: Transaction[];
  balance: Balance;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async all(): Promise<ResponseDTO> {
    const transactions = await this.find({
      relations: ['category'],
    });
    const balance = await this.getBalance();

    return { transactions, balance };
  }

  public async getBalance(): Promise<Balance> {
    const { incomeSum } = await this.createQueryBuilder('transactions')
      .select('SUM(transactions.value)', 'incomeSum')
      .where('transactions.type = :type', { type: 'income' })
      .getRawOne();

    const { outcomeSum } = await this.createQueryBuilder('transactions')
      .select('SUM(transactions.value)', 'outcomeSum')
      .where('transactions.type = :type', { type: 'outcome' })
      .getRawOne();

    const balance: Balance = {
      income: parseFloat(incomeSum) || 0,
      outcome: parseFloat(outcomeSum) || 0,
      total: incomeSum - outcomeSum || 0,
    };

    return balance;
  }
}

export default TransactionsRepository;
