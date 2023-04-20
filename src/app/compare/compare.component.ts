import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compare',
  template: `
    <div class="container is-widescreen">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child notification is-success">
                <p class="title">Tips</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-6">
            <div class="field">
              <label for="plant" class="label is-size-4 has-text-weight-light">Plant:</label>
              <div class="select">
                <select name="plant" [(ngModel)]="selectedPlant">
                  <option *ngFor="let plant of gardenPlants" [ngValue]="plant">{{ plant.name }}</option>
                </select>
              </div>
            </div>
            <div class="field">
              <button class="button is-success is-size-5" (click)="getTips()">Get Tips</button>
            </div>
          </div>
          <div class="column is-6" *ngIf="tipsResult">
            <h3 class="title is-4">{{ tipsResult.name }}</h3>
            <table class="table is-striped">
              <tbody>
              <tr *ngFor="let item of tipsResult.details">
                <td>{{ item.key }}</td>
                <td>{{ item.value }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class CompareComponent implements OnInit {
  selectedPlant: string = '';
  gardenPlants: any[] = [];
  tipsResult: any = null;

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.authService.getCurrentUser()) {
      this.router.navigate(['/login']);
    } else {
      this.fetchGardenPlants();
    }
  }
  getUserEmail(): string { // Add this function
    return <string>this.authService.getCurrentUser();
  }
  fetchGardenPlants(): void {
    const userEmail = this.getUserEmail();
    this.http.get('http://127.0.0.1:5000/get-garden', { params: { email: userEmail } }).subscribe((response: any) => {
      this.gardenPlants = response.garden;
    });
  }
  getTips() {
    if (this.selectedPlant) {
      this.http
          .post('http://127.0.0.1:5000/get-tips', { plant: this.selectedPlant}) // Update this line
          .subscribe((response: any) => {
            this.tipsResult = response;
          });
    }
  }
}


