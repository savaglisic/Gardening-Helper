import { Component } from '@angular/core';

@Component({
  selector: 'app-compare',
  template: `
    <div class="container is-widescreen">
      <div class="tile is-ancestor">
        <div class="tile is-vertical is-12">
          <div class="tile">
            <div class="tile is-parent">
              <article class="tile is-child notification is-success">
                <p class="title">Compare Plants</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns is-variable is-1">
          <div class="column">
            <div class="field">
              <label for="plant1" class="label is-size-4 has-text-weight-light">Plant 1:</label>
              <div class="select">
                <select name="plant1" [(ngModel)]="selectedPlant1">
                  //Plant options
                </select>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label for="plant2" class="label is-size-4 has-text-weight-light">Plant 2:</label>
              <div class="select">
                <select name="plant2" [(ngModel)]="selectedPlant2">
                  //Plant options 
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <button class="button is-success is-size-5" (click)="comparePlants()">Compare</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class CompareComponent {
  selectedPlant1: string = ''; 
  selectedPlant2: string = ''; 

  constructor() {}

  comparePlants() {
    console.log(`Comparing ${this.selectedPlant1} and ${this.selectedPlant2}`);
  }
}
