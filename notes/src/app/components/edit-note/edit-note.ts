import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, signal } from '@angular/core';
import { NoteService } from '../../services/note-service';

@Component({
  imports: [FormsModule],
  selector: 'app-edit-note',
  styleUrl: './edit-note.css',
  templateUrl: './edit-note.html',
})
export class EditNote {
  private isError = signal<boolean>(false);
  private isLoading = signal<boolean>(false);
  private key: string | null = null;
  private noteTitle = signal<string>("");
  private noteContent = signal<string>("");

  constructor(private noteService: NoteService, private route: ActivatedRoute, private router: Router) {
    this.isLoading.set(true);
    this.key = route.snapshot.params["id"];

    if (!this.key) {
      this.isLoading.set(false);
      this.router.navigate([""]);
      return;
    }

    this.noteService.loadOneNote(route.snapshot.params["id"]).subscribe({
      next: (data) => {
        this.isLoading.set(false);

        if (!data) {
          this.isError.set(true);
          this.router.navigate([""]);
          return;
        }

        this.noteTitle.set(data.title);
        this.noteContent.set(data.content);
      },
      error: () => {
        this.isLoading.set(false);
        this.isError.set(true);
      }
    });
  }

  public update(title: HTMLInputElement, content: HTMLInputElement) {
    this.isLoading.set(true);

    if (!this.key) {
      this.isLoading.set(false);
      this.router.navigate([""]);
      return;
    }

    this.noteService.updateNote(this.key, title.value, content.value).subscribe({
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
