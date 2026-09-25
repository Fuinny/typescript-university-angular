import { Service } from '@angular/core';

@Service()
export class NoteService {
  public notes: [title: string, content: string][] = [];

  public constructor() {
    let tmp = localStorage.getItem("notes");

    if (tmp) {
      this.notes = JSON.parse(tmp);
    }
  }

  private save() {
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  public addNote(title: string, content: string) {
    this.notes.push([title, content]);
    this.save();
  }

  public deleteNoteAt(i: number) {
    this.notes.splice(i, 1);
    this.save();
  }
}
