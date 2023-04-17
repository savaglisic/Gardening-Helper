import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mygarden',
  templateUrl: './mygarden.component.html',
  styleUrls: ['./mygarden.component.css']
})
export class MygardenComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  myGarden: any[] = [];

  constructor(private http: HttpClient) {}

  searchPlants() {
    this.http.get(`http://127.0.0.1:5000/search?query=${this.searchQuery}`).subscribe(
        (response: any) => {
          console.log(response);
          this.searchResults = response.data;
        },
        (error) => {
          console.error(error);
          alert("An error occurred. Please try again.");
        }
    );
  }

  addToGarden(plant: any) {
    this.myGarden.push({ ...plant, planted: '', harvested: '', notes: '' });
    this.searchResults = this.searchResults.filter(item => item !== plant);
  }


  removeFromGarden(plant: any) {
    this.myGarden = this.myGarden.filter(item => item !== plant);
  }
}
