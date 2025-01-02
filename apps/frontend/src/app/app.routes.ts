import {  Route } from '@angular/router'
import { PeopleListComponent } from './components/people-list/people-list.component';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
   {path: '',
    redirectTo: 'people',
    pathMatch: 'full'
   },
   {
    path: 'people',
    component:PeopleListComponent
   },
   {
    path: 'welcome',
    component:NxWelcomeComponent
   }
];
