import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonDetail } from '@memberspot-fullstack-task/shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  fetchPeople(page: number): Observable<{ results: PersonDetail[]; total_records: number; }> {
    return this.http.get<{ results: PersonDetail[]; total_records: number; }>(`http://localhost:3000/people/list`, {
      params: { page: page.toString() },
    });
  }


  fetchPerson(searchTerm: string): Observable<{ results: PersonDetail[]; total_records: number }> {
    return this.http.get<{ results: PersonDetail[]; total_records: number}>(`http://localhost:3000/people/search`, {
      params: { searchTerm: searchTerm },
    });
  }
}
