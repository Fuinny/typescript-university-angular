import { Routes } from '@angular/router';
import { ListNotes } from './components/list-notes/list-notes';
import { AddNote } from './components/add-note/add-note';
import { EditNote } from './components/edit-note/edit-note';

export const routes: Routes = [
  {
    path: "",
    component: ListNotes
  },
  {
    path: "add",
    component: AddNote
  },
  {
    path: "edit/:id",
    component: EditNote
  }
];
