import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NoteService } from '../../services/note-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-list-notes',
  styleUrl: './list-notes.css',
  templateUrl: './list-notes.html',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ListNotes {
  public noteList: [title: string, content: string][] = [];

  public constructor(private noteService: NoteService) {
    this.noteList = noteService.notes;
  }

  public deleteNoteAt(i: number) {
    this.noteService.deleteNoteAt(i);
  }
}
