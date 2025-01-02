import { Controller, Get, Query } from '@nestjs/common';
import { PeopleService } from './people.service';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get('list')
  async getPeople(@Query('page') page: string) {
    const pageNumber = parseInt(page) || 1;
    return await this.peopleService.fetchPeople(pageNumber);
  }

  @Get('search')
  async getPerson(@Query('searchTerm') searchTerm: string) {
    return await this.peopleService.fetchPerson(searchTerm);
  }

}
