import { Component, signal } from '@angular/core';
import { AddNote } from './components/add-note/add-note';
import { ListNotes } from './components/list-notes/list-notes';

@Component({
  imports: [AddNote, ListNotes],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('notes');
}
