import { Body, Controller, Delete, Get, Param, Patch, Post, Res, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { CategoriesService } from './categories.service';
import { Category } from './Category';

@Controller('products/categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }

    @Get(":id")
    async GetById(@Param() params) {

        let result = await this.categoriesService.getById(params.id);
        if (result?.id) {
            this.logger.log("info", "["+ CategoriesController.name + "] - Getting category with id = " + params.id);
            return result;
        } else {
            this.logger.error("["+ CategoriesController.name + "] - Id not exist where id = " + params.id);
            this.logger.log("["+ CategoriesController.name + "] - error","Id not exist where id = " + params.id);
            return new Category;
        }
    }

    @Get()
    async GetAll() {
        this.logger.log("silly", "["+ CategoriesController.name + "] - Getting all categories");
        return await this.categoriesService.getAll();
    }

    @Patch(":id")
    Update(@Param() params, @Body() item: Category) {
        return this.categoriesService.Update(params.id, item);
    }

    @Post()
    Create(@Body() item: Category) {
        return this.categoriesService.Create(item);
    }

    @Delete(":id")
    Delete(@Param() params) {
        return this.categoriesService.Delete(params.id);
    }
}
