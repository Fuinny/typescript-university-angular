import { Routes } from '@angular/router';
import { ListNotes } from './components/list-notes/list-notes';
import { AddNote } from './components/add-note/add-note';

export const routes: Routes = [
  { path: "", component: ListNotes },
  { path: "add", component: AddNote }
];
