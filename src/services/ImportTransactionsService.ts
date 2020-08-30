import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';

import Transaction from '../models/Transaction';
import CreateTransactionService, {
  NewTransactionDTO,
} from './CreateTransactionService';

interface RequestDTO {
  destination: string;
  filename: string;
}

class ImportTransactionsService {
  public async execute({
    destination,
    filename,
  }: RequestDTO): Promise<Transaction[]> {
    const csvFilePath = path.join(destination, filename);
    const importedNewTransactions = await this.loadCSV(csvFilePath);

    const transactions: Transaction[] = [];

    const createTransaction = new CreateTransactionService();

    // eslint-disable-next-line no-restricted-syntax
    for (const newTransaction of importedNewTransactions) {
      // eslint-disable-next-line no-await-in-loop
      const response = await createTransaction
        .execute(newTransaction)
        .catch(err => {
          throw err;
        });
      transactions.push(response);
    }

    return transactions;
  }

  private async loadCSV(filePath: string): Promise<NewTransactionDTO[]> {
    const readCSVStream = fs.createReadStream(filePath);
    const parseStream = csvParse({ from_line: 2, ltrim: true, rtrim: true });
    const parseCSV = readCSVStream.pipe(parseStream);

    const newTransactionDataList: NewTransactionDTO[] = [];

    parseCSV.on('data', line => {
      const newTransactionData: NewTransactionDTO = {
        title: line[0],
        type: line[1],
        value: line[2],
        category: line[3],
      };
      newTransactionDataList.push(newTransactionData);
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    await fs.promises.unlink(filePath);
    return newTransactionDataList;
  }
}

export default ImportTransactionsService;
