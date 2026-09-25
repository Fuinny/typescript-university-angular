import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note-service';

@Component({
  imports: [FormsModule],
  selector: 'app-add-note',
  styleUrl: './add-note.css',
  templateUrl: './add-note.html',
})
export class AddNote {
  public noteTitle: string | null = null;
  public noteContent: string | null = null;
  public noteList: [title: string, content: string][] = [];

  public constructor(private noteService: NoteService) {
    this.noteList = noteService.notes;
  }

  public addNote() {
    if (this.noteTitle && this.noteContent) {
      this.noteService.addNote(this.noteTitle, this.noteContent);
      this.noteTitle = null;
      this.noteContent = null;
    }
  }
}
