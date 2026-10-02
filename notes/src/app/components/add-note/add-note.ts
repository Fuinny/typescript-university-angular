import { Router } from '@angular/router';
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

  public constructor(private noteService: NoteService, private router: Router) { }

  public addNote() {
    if (this.noteTitle && this.noteContent) {
      this.noteService.addNote(this.noteTitle, this.noteContent).subscribe(() => {
        this.router.navigate([""]);
      });
    }
  }
}
