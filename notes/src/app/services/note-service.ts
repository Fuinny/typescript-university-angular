import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class NoteService {
  private url: string = "https://notes-a3c04-default-rtdb.europe-west1.firebasedatabase.app/notes";

  public constructor(private http: HttpClient) { }

  public loadNotes() {
    return this.http.get<{ [key: string]: { "title": string, "content": string } }>(this.url + ".json");
  }

  public addNote(title: string, content: string) {
    return this.http.post(this.url + ".json", {
      "title": title,
      "content": content
    });
  }

  public deleteNoteAt(id: string) {
    return this.http.delete(this.url + "/" + id + ".json");
  }
}
