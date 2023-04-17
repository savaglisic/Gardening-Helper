import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-alerts',
  template: `
    <section class="section">
      <div class="container">
        <h2 class="title is-2 is-capitalized">Set Alert</h2>
        <form (ngSubmit)="submitForm(alertForm)" #alertForm="ngForm" action="" method="post">
          <div class="field">
            <label for="date" class="label is-size-4 has-text-weight-light">Date:</label>
            <input type="date" name="date" class="input" [(ngModel)]="date" #dateInput="ngModel" required>
            <div class="help is-danger" *ngIf="dateInput.invalid && dateInput.touched">
              Please enter a valid date
            </div>
          </div>

          <div class="field">
            <label for="time" class="label is-size-4 has-text-weight-light">Time:</label>
            <input type="time" name="time" class="input" [(ngModel)]="time" #timeInput="ngModel" required>
            <div class="help is-danger" *ngIf="timeInput.invalid && timeInput.touched">
              Please enter a valid time
            </div>
          </div>

          <div class="field">
            <label for="note" class="label is-size-4 has-text-weight-light">Plant Name:</label>
            <textarea name="note" rows="5" class="textarea is-medium" placeholder="Note" [(ngModel)]="note" required></textarea>
          </div>

          <button type="submit" class="button is-success is-size-5" [disabled]="alertForm.invalid">
            Set Alert
          </button>
        </form>
      </div>
    </section>
  `
})
export class AlertsComponent {
  date!: string;
  time!: string;
  note!: string;

  constructor() {}

  submitForm(alertForm: NgForm) {
    console.log(this.date);
    console.log(this.time);
    console.log(this.note);
    alert('Alert set for ' + this.date + ' at ' + this.time + ': ' + this.note);
    alertForm.resetForm();
  }
}

