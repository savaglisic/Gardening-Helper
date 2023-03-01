import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  template: `

<section class="section">
<div class="container">
    <h2 class="title is-2 is-capitalized">Contact Us</h2>
    <form (ngSubmit)="submitForm(contactForm)" #contactForm="ngForm" action="" method="post">
        <div class="field">
            <label for="name" class="label is-size-4 has-text-weight-light"></label>
            <input 
                type="text" 
                name="name"
                class="input" 
                placeholder="Name" 
                autofocus 
                [(ngModel)]="name" 
                #nameInput = "ngModel"
                required>
                    <span class="icon is-left">
                        <i class="fa fa-user"></i>
                    </span>
            <div class= "help is-danger" *ngIf="nameInput.invalid && nameInput.touched"> 
              Please enter your full name in the space provided
            </div>
        </div>

        <div class="field">
            <label for="email" class="label is-size-4 has-text-weight-light"></label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  class="input" 
                  placeholder="Email" 
                  [(ngModel)]="email" 
                  #emailInput = "ngModel"
                  required
                  email>
                    <span class="icon is-left">
                        <i class="fa fa-envelope"></i>
                    </span>
                <div class= "help is-danger" *ngIf="emailInput.invalid && emailInput.touched"> 
                  Please enter a valid e-mail
                </div>
        </div>

        <div class="field">
            <label for="message" class="label is-size-4 has-text-weight-light"></label>
            <textarea 
            name="message" 
            id="message" 
            rows="5" 
            class="textarea is-medium" 
            placeholder="Message" 
            [(ngModel)]="message" 
            required></textarea>
        </div>

        <button 
        type="submit" 
        class="button is-success is-size-5"
        [disabled] ="contactForm.invalid">
        Submit
      </button>
  </form>
</div>
    
  `,
  styles: [
  ]
})
export class ContactComponent implements OnInit{
  name!: string;
  email!: string;
  message!: string;
  contactForm!: NgForm;
  
  constructor(){}
  ngOnInit(){}
  submitForm(contactForm: NgForm){
    console.log(this.name);
    console.log(this.email);
    console.log(this.message);
  alert("Thank you for reaching out! We will get back to you shortly.");
  contactForm.resetForm();
  }
}

