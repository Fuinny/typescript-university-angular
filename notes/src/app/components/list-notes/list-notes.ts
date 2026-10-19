import { Note } from '../../models/note';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note-service';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-list-notes',
  styleUrl: './list-notes.css',
  templateUrl: './list-notes.html',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ListNotes {
  private isError = signal<boolean>(false);
  private isLoading = signal<boolean>(false);
  public noteList = signal<Note[]>([]);

  private loadData() {
    this.isLoading.set(true);
    this.noteService.loadNotes().subscribe({
      next: (data) => {
        this.isLoading.set(false);

        const tmp: Note[] = [];

        for (let id in data) {
          tmp.push({
            id: id,
            title: data[id].title,
            content: data[id].content
          })
        }

        this.noteList.set(tmp);
      },
      error: () => {
        this.isLoading.set(false);
        this.isError.set(true);
      }
    });
  }

  public constructor(private noteService: NoteService) {
    this.loadData();
  }

  public deleteNoteAt(id: string) {
    this.isLoading.set(true);
    this.noteService.deleteNoteAt(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: () => {
        this.isLoading.set(false);
        this.isError.set(true);
      }
    });
  }
}
