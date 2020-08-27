import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const { affected } = await transactionRepository.delete(id);
    if (affected === 0) throw new AppError('Transaction not found!', 404);
  }
}

export default DeleteTransactionService;
