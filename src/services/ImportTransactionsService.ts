import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';

import Transaction from '../models/Transaction';
import CreateTransactionService, {
  NewTransactionData,
} from './CreateTransactionService';

import AppError from '../errors/AppError';

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

    const teste = await this.loadCSV(csvFilePath);

    const importedTransactions: Transaction[] = [];

    const createTransaction = new CreateTransactionService();

    return importedTransactions;
  }

  private async loadCSV(filePath: string): Promise<NewTransactionData[]> {
    const readCSVStream = fs.createReadStream(filePath);
    const parseStream = csvParse({ from_line: 2, ltrim: true, rtrim: true });
    const parseCSV = readCSVStream.pipe(parseStream);

    const newTransactionDataList: NewTransactionData[] = [];

    parseCSV.on('data', line => {
      const newTransactionData: NewTransactionData = {
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

    return newTransactionDataList;
  }
}

export default ImportTransactionsService;
