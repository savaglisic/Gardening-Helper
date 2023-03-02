import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mygarden',
  templateUrl: './mygarden.component.html',
  styleUrls: ['./mygarden.component.css']
})
export class MygardenComponent {
  searchTerm!: string;
  searchResults: any[] = []; // Initialize to empty array

  constructor(private http: HttpClient) { }

  search() {
    this.http.get<any[]>('http://127.0.0.1:5000/api/search/' + this.searchTerm).subscribe(
      data => {
        this.searchResults = data;
      },
      error => {
        console.error(error);
      }
    );
  }
}

