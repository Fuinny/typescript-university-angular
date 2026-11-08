import { Routes } from '@angular/router';
import { ClientList } from './components/clients/client-list/client-list';
import { ClientNew } from './components/clients/client-new/client-new';

export const routes: Routes = [
  { path: "", component: ClientList },
  { path: "client/new", component: ClientNew }
];
