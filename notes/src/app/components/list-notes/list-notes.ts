import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NoteService } from '../../services/note-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note';

@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-list-notes',
  styleUrl: './list-notes.css',
  templateUrl: './list-notes.html',
  changeDetection: ChangeDetectionStrategy.Eager
})
export class ListNotes {
  public noteList = signal<Note[]>([]);

  private loadData() {
    this.noteService.loadNotes().subscribe((data) => {
      const tmp: Note[] = [];

      for (let id in data) {
        tmp.push({
          id: id,
          title: data[id].title,
          content: data[id].content
        })
      }

      this.noteList.set(tmp);
    })
  }

  public constructor(private noteService: NoteService) {
    this.loadData();
  }

  public deleteNoteAt(id: string) {
    this.noteService.deleteNoteAt(id).subscribe(() => {
      this.loadData();
    });
  }
}
