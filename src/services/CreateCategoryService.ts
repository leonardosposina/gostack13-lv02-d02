import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface ResquestDTO {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: ResquestDTO): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const foundCategory = await categoryRepository.findOne({
      where: { title },
    });

    if (foundCategory) return foundCategory;

    const category = categoryRepository.create({ title });
    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
