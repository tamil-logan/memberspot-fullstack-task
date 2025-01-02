import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleService } from '../people.service';


@Component({
  selector: 'app-people-list',
  imports: [CommonModule],
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css',
})
export class PeopleListComponent implements OnInit {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   people: any[] = [];
   totalRecords = 0;
   currentPage = 1;
   searching = false

   constructor(private peopleService: PeopleService) {}

   ngOnInit() {
     this.loadPeople();
   }

   loadPeople() {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     this.peopleService.fetchPeople(this.currentPage).subscribe((data: any) => {
      console.log(data)
       this.people = data.results;
       this.totalRecords = data.total_records;
     });
   }


   getPerson(searchTerm: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.peopleService.fetchPerson(searchTerm).subscribe((data: any) => {
     console.log(data)
      this.people = data.results;
      this.totalRecords = data.total_records;
    });
  }

   nextPage() {
     if (this.currentPage < Math.ceil(this.totalRecords / 10)) {
       this.currentPage++;
       this.loadPeople();
     }
   }

   previousPage() {
     if (this.currentPage > 1) {
       this.currentPage--;
       this.loadPeople();
     }
   }

   onSubmit(val: string){
    if(!val){
      return;
    }
    this.searching = true
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.peopleService.fetchPerson(val).subscribe((data: any) => {
      console.log('i am', data)
       this.people = data.results;
       this.totalRecords = data.total_records;
     });
   }
}
