**Team Video link**: 
https://youtu.be/XMYWrKzgFUg




**Work we completed in Sprint 4**






Front-End: 
* We updated the Amazon Associate Search functionality that was implemented for Sprint 3. We decided to create a static, curated list of gardening tools and supplies. Sixteen items are pictured and include a ‘Buy’ button that links the user to the item’s Amazon page.
* Finished designing an engaging homepage that displays our applications model, highlights key features, and provides users with an understanding of our platform's use.
* Created a new page called ‘Tips’ to view the stats of the plants that have been added to a user’s ‘My Garden’ table. 
* Set up the ‘Alerts’ page to accept user input for an email notification of when to tend to their plants




Back end: 


* We utilized Python Flask and the OpenAI API to extract precise information about plants, and created an index.html file and CSS code to enhance the user interface of the application. This allowed us to obtain accurate and comprehensive details about plants.
* We worked on the front-end code to ensure seamless compatibility and login state management.
* We updated the schema of user_data to efficiently store user profile information, in addition to supporting add/edit//delete operations on the user’s “garden”.
* We implemented a number of routes including:
* /login
* /signup
* /add_to_garden
* /get_garden … downloads garden on garden page initialization 
* /remove_from_garden
* /save_garden_changes … allows user to add notes and dates to a plant object
* /search … hooks into Golang plant api that enables search of thousands of plants
* /get_tips … accesses open ai text generation to populate a table of relevant plant info












**Unit tests and Cypress test for frontend**
describe('Go to Garden Helper Test', () => {
  it('Visits Garden Helper', () => {
    cy.visit('http://localhost:4200/')
  })
})


describe('Nav Bar Test', () => {
  it('Visits Garden Helper', () => {
    cy.visit('http://localhost:4200/')


    cy.contains('My Garden').click({ force: true })
    cy.location('pathname').should('eq', '/mygarden')
    cy.go('back')


    cy.contains('Alerts').click({ force: true })
    cy.location('pathname').should('eq', '/alerts')
    cy.go('back')


    cy.contains('Gardening Goodies').click({ force: true })
    cy.location('pathname').should('eq', '/goodies')
    cy.go('back')


    cy.contains('Our Mission').click({ force: true })
    cy.location('pathname').should('eq', '/ourmission')
    cy.go('back')


    cy.contains('Contact Us').click({ force: true })
    cy.location('pathname').should('eq', '/contact')
    cy.go('back')


    cy.contains('Sign up').click({ force: true })
    cy.location('pathname').should('eq', '/signup')
    cy.go('back')


    cy.contains('Log in').click({ force: true })
    cy.location('pathname').should('eq', '/login')
    cy.go('back')
  })
})


describe('Check Hyperlinks', () => {
  it('check all links to sites', () => {
    const links = ['Gardening Goodies', 'My Garden', 'Alerts']


    links.forEach(link => {


      cy.contains(link).click()
      cy.location('pathname').should('eq', `/${link}`)
      cy.go('back')
  
    })
  });
})


describe('Check SignUp', () => {
  it('enter username and password', () => {
    cy.visit('http://localhost:4200/signup');
    
    cy.get("input[name='firstName']").type("FirstName");
    cy.get("input[name='lastName']").type("LastName");
    cy.get("input[name='email']").type("testemail@mail.com");
    cy.get("input[name='password']").type("Password");
    cy.get("input[name='confirmPassword']").type("Password");


    cy.get("button[type='submit']").click();


  });
});


describe('Click Event', () => {
  it('Check Amazon Links', () => {
    cy.visit('http://localhost:4200/gardeninggoodies')


    cy.get('a').should('have.attr', 'href', 'https://amazon.com')


    cy.contains('Buy').click({ force: true },{multiple: true}).should('have.attr', 'https://amazon.com')
    cy.location('pathname').should('eq', '/mygarden')


    cy.get('a').invoke('removeAttr', 'target').click({multiple: true})
    cy.url().should('include', 'amazon.com')    
  })
})


import {ComponentFixture, TestBed, inject, tick, fakeAsync, waitForAsync} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoginComponent } from '../app/login/login.component';


describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let db: DebugElement;


beforeEach (waitForAsync(() => {
    TestBed.configureTestingModule({
        declarations: [LoginComponent],
    })
    .compileComponents();
}))


beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    db = fixture.debugElement;
    fixture.detectChanges();
});


it('it should create', () => {
    expect(component).toBeTruthy();
});


});
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { GardeningGoodiesComponent } from './mygarden.component';


describe('GardeningGoodiesComponent', () => {
  let component: GardeningGoodiesComponent;
  let fixture: ComponentFixture<GardeningGoodiesComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardeningGoodiesComponent]
    });
    fixture = TestBed.createComponent(GardeningGoodiesComponent);
    component = fixture.componentInstance;
  });


  it('should click Set button', async(() => {
    fixture.detectChanges();
    let buttonElement = fixture.debugElement.query(By.css('.set-button'));
    let p = fixture.debugElement.nativeElement.querySelector('p');


    buttonElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    }));
});


Unit test case for backend


from unittest import TestCase
from app import app, generate_prompt




class TestApp(TestCase):
    def test_generate_prompt(self):
        plant = "Cucumber"
        expected_prompt = """Provide the following one line details for the given plant.
    
    Plant name: Cucumber\n
    Plant name: Cucumber\n
    Scientific name: Cucumis sativus\n
    Flower type: Yellow\n
    Seed types: Monoecious or dioecious, depending on the cultivar\n
    Season type: Warm season crop\n
    Preferred soil type: Well-drained, fertile soil\n
    Preferred pH level: 6.0-7.0\n
    Preferred nutrition: Balanced fertilizer with more emphasis on nitrogen\n
    Harvest time: 50-70 days after sowing\n
    Plant compatibility: Avoid planting with aromatic herbs or nightshades.\n
    Plant: Cucumber"""


        actual_prompt = generate_prompt(plant)
        self.assertEqual(expected_prompt, actual_prompt)