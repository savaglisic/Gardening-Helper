**Frontend video link**: 
https://drive.google.com/file/d/1XatcY9vMXa_9jZFCXjmFcntpO1i2VWC5/view?usp=sharing

**Backend video link**:
https://youtu.be/1nsyO1FUCy0


**Work we completed in Sprint 3**

Front-End: 

-Designed an engaging and informative LandingPage that displays our applications model, highlights key features, and provides users with an understanding of our platform's use. The user-centric design not only captivates visitors but also encourages them to explore further and fully experience the website's offerings.

-IIncorporated Amazon Associate Search functionality to allow users to effortlessly browse and discover a selection of products specifically designed to promote garden growth. This integration streamlines the shopping experience for end users.

Back end: 

Implemented Sign Up, Login, User state management functionality, jsonifying user data and storing it in a central “user_data” json file that can be quickly parsed. Worked to tie front and backend together more cohesively, Added components to the front end “My Garden” page, allowing the user to query the backend for new plants, and add them to their garden, as well as fill in additional information to be stored with their account. Performed some optimizations to make the parsing of database output quicker.

Implemented plant tracker functionality which helps user to track their plant growth in their garden. Another implemented functionality is the “Purchase” function, which allows user to help purchasing their need for their garden for example seeds, fertilizers and other gardening tool by clicking the weblink.  


Data Processing Work:


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
    cy.get("input[name='username']").type("userName");
    cy.get("input[name='password']").type("Password");
    cy.get("input[name='confirmPassword']").type("Password");

    cy.get("button[type='submit']").click();

  });
});

import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Directive, Input, HostListener } from '@angular/core';
export { RouterLink} from '@angular/router';
import { ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login/login.component';
 
@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;
 
  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
 
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    RouterLinkDirectiveStub
  ]
})
export class RouterStubsModule {}

describe('Test Karma', () => 
it("should fail", function() {        
  expect(true).toBe(false); })
)

describe('AppComponent', () => {
beforeEach(async () => {
await TestBed.configureTestingModule({
declarations: [
AppComponent
],
}).compileComponents();
});

it('should create the app', () => {
const fixture = TestBed.createComponent(AppComponent);
const app = fixture.componentInstance;
expect(app).toBeTruthy();
});

it(`should have as title 'SimpleApp'`, () => {
const fixture = TestBed.createComponent(AppComponent);
const app = fixture.componentInstance;
expect(app.title).toEqual('FreeApp');
});

it('should render title', () => {
const fixture = TestBed.createComponent(AppComponent);
fixture.detectChanges();
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.querySelector('.content span')?.textContent).toContain('SimpleApp app is running!');
});
});


**Unit tests for backend**

The below test cases is for the implemented functionality in main.go func plantTracker, which basically helps user to track the plant that they have planted in their garden. Another test case is for the purchase function which check if user input “1” for the seed, it will return the weblink which user can use to purchase the seeds for the plant they want to plant in their garden. 


func TestPlantTracker(t *testing.T) {
	input := "My Plant\nn\nGrowing\ny\n/path/to/image.jpg\ny\nSome notes\n"
	reader := bufio.NewReader(strings.NewReader(input))

	// Replace os.Stdin with reader for testing
	bufio.NewReader(reader)
	bufio.NewReader(os.Stdin)

	plantTracker()
}



func TestAddPlant(t *testing.T) {
	// Set up
	Garden = make(map[string]Plant)

	// Test case 1: add a plant with a valid name and description
	input1 := "rose\ngood.\ncool.\n."
	expectedOutput1 := "Enter plant name: Enter plant description: Plant added to the garden successfully!\n\n"
	bufio.NewReader(strings.NewReader(input1))
	output1 := &bytes.Buffer{}
	log.SetOutput(output1)
	addPlant()
	if _, ok := Garden["rose"]; !ok {
		t.Errorf("Failed to add plant with name 'rose'")
	}
	if output1.String() != expectedOutput1 {
		t.Errorf("Output incorrect. Expected '%s', but got '%s'", expectedOutput1, output1.String())
	}
}


func TestPurchaseProducts(t *testing.T) {
	input := "1\n"
	expectedOutput := "Here are some links to purchase seeds:\nBurpee: https://www.burpee.com/\nJohnny's Selected Seeds: https://www.johnnyseeds.com/\nSeed Savers Exchange: https://www.seedsavers.org/\nBaker Creek Heirloom Seeds: https://www.rareseeds.com/\nPark Seed: https://parkseed.com/\n"
	r := strings.NewReader(input)
	 bufio.NewReader(r)
	w := new(bytes.Buffer)
	//out := 
	

	// Call function
	purchaseProducts()

	// Test output
	if w.String() != expectedOutput {
		t.Errorf("Test failed. Expected:\n%s\n, but got:\n%s", expectedOutput, w.String())
	}
}

