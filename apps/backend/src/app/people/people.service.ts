import { PersonDetail, PersonList } from '@memberspot-fullstack-task/shared';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface ApiResult<T> {
  total_records: number;
  total_pages: number;
  results: T[];
}

interface PersonDetails {
  name: string;
  birth_year: string;
  homeworld: string;
}

interface HomeworldDetails {
  name: string;
  terrain: string;
}


@Injectable()
export class PeopleService {
  private readonly baseUrl = 'https://www.swapi.tech/api';
  private readonly cache = new Map<string, unknown>(); // Generic in-memory cache

  /**
   * Fetch data from URL with caching
   * @param url - The API URL to fetch data from (planet & person properties)
   */
  private async fetchWithCache<T>(url: string): Promise<T> {
    if (this.cache.has(url)) {
      return this.cache.get(url) as T;
    }

    const { data } = await axios.get<{ result: { properties: T } }>(url);
    const result = data.result.properties;
    this.cache.set(url, result);
    return result;
  }

  /**
   * Fetch the list of people with enriched details
   * @param page - The page number to fetch
   */
  public async fetchPeople(page: number): Promise<ApiResult<PersonDetail>> {
    const { data } = await axios.get<ApiResult<PersonList>>(`${this.baseUrl}/people?page=${page}&limit=10`);

    const enrichedPeople = await Promise.all(
      data.results.map(async (person) => {
        const personDetails = await this.fetchWithCache<PersonDetails>(person.url);
        const homeworldDetails = await this.fetchWithCache<HomeworldDetails>(personDetails.homeworld);

        return {
          uid: person.uid,
          name: person.name,
          birth_year: personDetails.birth_year,
          homeworld_name: homeworldDetails.name,
          homeworld_terrain: homeworldDetails.terrain,
        };
      })
    );

    return {
      total_records: data.total_records,
      total_pages: data.total_pages,
      results: enrichedPeople,
    };
  }

  /**
   * Search for a person by name
   * @param searchterm - The search term to look for
   */
  public async fetchPerson(searchterm: string): Promise<ApiResult<PersonDetail>> {
    const { data } = await axios.get(
      `${this.baseUrl}/people?name=${searchterm}`
    );

    const enrichedPeople = await Promise.all(
      data.result.map(async (person) => {
        const personDetails = person.properties as PersonDetails;
        const homeworldDetails = await this.fetchWithCache<HomeworldDetails>(personDetails.homeworld);

        return {
          uid: person.uid,
          name: personDetails.name,
          birth_year: personDetails.birth_year,
          homeworld_name: homeworldDetails?.name || 'Unknown',
          homeworld_terrain: homeworldDetails?.terrain || 'Unknown',
        };
      })
    );

    return {
      total_records: data.total_records,
      total_pages: data.total_pages,
      results: enrichedPeople,
    };
  }
}
