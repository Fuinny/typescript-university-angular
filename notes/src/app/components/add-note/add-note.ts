import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, signal } from '@angular/core';
import { NoteService } from '../../services/note-service';

@Component({
  imports: [FormsModule],
  selector: 'app-add-note',
  styleUrl: './add-note.css',
  templateUrl: './add-note.html',
})
export class AddNote {
  private isError = signal<boolean>(false);
  private isLoading = signal<boolean>(false);
  public noteTitle: string | null = null;
  public noteContent: string | null = null;

  public constructor(private noteService: NoteService, private router: Router) { }

  public addNote() {
    if (this.noteTitle && this.noteContent) {
      this.isLoading.set(true);
      this.noteService.addNote(this.noteTitle, this.noteContent).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate([""]);
        },
        error: () => {
          this.isLoading.set(false);
          this.isError.set(true);
        }
      });
    }
  }
}
