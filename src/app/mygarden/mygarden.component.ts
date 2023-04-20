import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "../auth.service";
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        if (this.currentUser) {
            console.log('Current user:', this.currentUser);
            this.getGardenData();
        } else {
            console.log('No user is logged in');
            this.router.navigate(['/login']);
        }
    }

    getGardenData() {
        this.http.get(`http://127.0.0.1:5000/get-garden?email=${this.currentUser}`).subscribe(
            (response: any) => {
                console.log(response);
                this.myGarden = response.garden;
            },
            (error) => {
                console.error(error);
                alert("An error occurred. Please try again.");
            }
        );
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
    this.http.post('http://127.0.0.1:5000/add-to-garden', {
      email: this.currentUser,
      plant: { ...plant, planted: '', harvested: '', notes: '' },
    }).subscribe(
        (response: any) => {
          console.log(response);
          this.myGarden.push(response.plant);
          this.searchResults = this.searchResults.filter(item => item !== plant);
        },
        (error) => {
          console.error(error);
          alert("An error occurred. Please try again.");
        }
    );
  }
    removeFromGarden(plant: any) {
        this.http.post('http://127.0.0.1:5000/remove-from-garden', {
            email: this.currentUser,
            plant: plant
        }).subscribe(
            (response: any) => {
                console.log(response);
                this.myGarden = this.myGarden.filter(item => item !== plant);
            },
            (error) => {
                console.error(error);
                alert("An error occurred. Please try again.");
            }
        );
    }

    saveGardenChanges() {
        this.http.post('http://127.0.0.1:5000/save-garden-changes', {
            email: this.currentUser,
            garden: this.myGarden
        }).subscribe(
            (response: any) => {
                console.log(response);
                alert("Garden changes saved successfully.");
            },
            (error) => {
                console.error(error);
                alert("An error occurred. Please try again.");
            }
        );
    }
}
