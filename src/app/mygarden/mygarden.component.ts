import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-mygarden',
  templateUrl: './mygarden.component.html',
  styleUrls: ['./mygarden.component.css']
})
export class MygardenComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  myGarden: any[] = [];
  currentUser: string | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      console.log('Current user:', this.currentUser);
    } else {
      console.log('No user is logged in');
    }
  }

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
