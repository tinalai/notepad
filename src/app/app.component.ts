import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Notepad app';
  private apiUrl = 'https://api.github.com/gists/bd8e7fb371c12ac87827d00ae57e6f6e';
  data: any = {};

  constructor(private http: Http) {
    console.log('Connecting to note API');
    this.getNotes();
    this.getData();
  }

  getData() {
    return this.http.get(this.apiUrl)
      .map((res: Response) => res.json())
  }

  getNotes() {
    this.getData().subscribe(data => {
      console.log('data from api',data.files);
      this.data = data.files;
    })
  }

  createNote(newNote) {
    return this.http.post(this.apiUrl, newNote)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Post error");
        }
      )
  }
}
