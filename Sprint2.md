**Frontend video link**: 
https://drive.google.com/file/d/1fcYHwdY-QLhSxosGaZZE46xU8PAclEQe/view?usp=share_link

**Backend video link**:
https://youtu.be/lCX6jouvCwk

**Work we completed in Sprint 2**

Front-End: 

Implemented interactive contact form. If User does not enter proper information, the application prompts the user to enter proper information.
Information is then saved so it can be accessed to contact user in return. 

Implemented a signup form with the same interactive format. After sign up is prompted, user is directed to login page. 
User information is stored and logged so it can be sent to the back end and used for login and account services.

Back end: 

Implemented and reusing the search function where user can search for the plant details which return the details about the plants. 

To save the plants in the garden, we implemented a function that allows users to save plant data to a JSON file if they choose to add a plant to their garden.

Lastly, we implemented a function that allows users to view their saved plants at any time. This function likely uses file handling and user interface programming to display the saved data to the user in an easily accessible format. This feature provides users with the ability to keep track of the plants in their garden and review their plant data as needed.


API Work:
Created a Python/Flask backend APIi, wrote a simplified version of the “My Garden” angular component to communicate with it, modified golang program to run as a subprocess with command line arguments in the flask backend, prompted by http request. At this stage, the user is able to submit a search for plants, this is sent to the flask backend where the search term is routed into the golang data processor app that returns a list of plant results. These results print in the python console. The results still need to be parsed into a python list, and “jsonified” so that they can be transmitted back to the front end for display to the user.

The Flask API creates a web server that works in tandem with the Angular CLI web server. I’m also utilizing a module called “flask_cors”, which allows server to server communication with an IP whitelist system. It handles page routing and http requests.

Data Processing Work:

During the first sprint, we encountered an issue while trying to retrieve data from Trefle API, resulting in an error. Additionally, when we managed to pull out the data, we noticed that some fields were missing from the output. However, after reading the documentation more thoroughly, we were able to identify the root cause of the problem and successfully resolved it. As a result, we were able to implement the search function seamlessly, allowing users to search for any specific plant details without encountering any missing field values. 

**Unit tests and Cypress test for frontend**
Unit Test
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component'
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
});});

Cypress Test
describe('Nav Bar Test', () => {
  it('Visits Garden Helper', () => {
    cy.visit('http://localhost:4200/')
    cy.contains('My Garden').click({force: true})
    cy.location('pathname').should('eq', '/mygarden')
    cy.go('back')
    cy.contains('Alerts').click({force: true})
    cy.location('pathname').should('eq', '/alerts')
    cy.go('back')
    cy.contains('Gardening Goodies').click({force: true})
    cy.location('pathname').should('eq', '/goodies')
    cy.go('back')
    cy.contains('Our Mission').click({force: true})
    cy.location('pathname').should('eq', '/ourmission')
    cy.go('back'
    cy.contains('Contact Us').click({force: true})
    cy.location('pathname').should('eq', '/contact')
    cy.go('back')
    cy.contains('Sign up').click({force: true})
    cy.location('pathname').should('eq', '/signup')
    cy.go('back')
    cy.contains('Log in').click({force: true})
    cy.location('pathname').should('eq', '/login')
    cy.go('back')
  })
})

**Unit tests for backend**
Here is the Unit tests that we used for the backend

func TestSearchPlant(t *testing.T) {
	// Prepare test data
	input := "rose"
	expectedOutput := "Common Name: rose\nScientific Name: Rosa\nSlug: rosa\nRank: genus\nGenus:  Rosa\nFamily common name:  Rosaceae\nIs Vegetable: false"

	// Set up reader to simulate user input
	reader := bufio.NewReader(strings.NewReader("yes\nrose\n"))

	// Replace stdout with a buffer to capture output
	stdout := &bytes.Buffer{}
	oldStdout := os.Stdout
	os.Stdout = stdout
	defer func() { os.Stdout = oldStdout }()

	// Call the function being tested
	searchPlant(reader, input)

	// Compare actual output with expected output
	if !strings.Contains(stdout.String(), expectedOutput) {
		t.Errorf("searchPlant() output = %q; expected %q", stdout.String(), expectedOutput)
	}
}
The above tets case helps to verify that the code is working as expected and produce the expected output for the searchPlant() function in main.go file

func TestAddPlant(t *testing.T) {
	// Prepare test data
	input := "rose\nA beautiful flower.\n.\n"
	expectedOutput := "Plant added to the garden successfully!"

	// Set up reader to simulate user input
	reader := bufio.NewReader(strings.NewReader(input))

	// Replace stdout with a buffer to capture output
	stdout := &bytes.Buffer{}
	oldStdout := os.Stdout
	os.Stdout = stdout
	defer func() { os.Stdout = oldStdout }()

	// Call the function being tested
	addPlant(reader)

	// Compare actual output with expected output
	if !strings.Contains(stdout.String(), expectedOutput) {
		t.Errorf("addPlant() output = %q; expected %q", stdout.String(), expectedOutput)
	}
}

The above tets case helps to verify that the code is working as expected and produce the expected output for the addPlant() function in main.go file.


func TestEditPlant(t *testing.T) {
	// Prepare test data
	input := "rose\nA beautiful flower.\n.\n"
	plantName := "rose"
	expectedOutput := "Plant description updated successfully!"

	// Set up reader to simulate user input
	reader := bufio.NewReader(strings.NewReader(input))

	// Replace stdout with a buffer to capture output
	stdout := &bytes.Buffer{}
	oldStdout := os.Stdout
	//os.Stdout = stdout
	defer func() { os.Stdout = oldStdout }()

	// Add plant to garden to prepare for editing
	addPlant()

	// Reset the buffer and reader
	stdout.Reset()
	reader.Reset(strings.NewReader("A beautiful and fragrant flower.\n.\n"))

	// Call the function being tested
	editPlant(reader)

	// Compare actual output with expected output
	if !strings.Contains(stdout.String(), expectedOutput) {
		t.Errorf("editPlant() output = %q; expected %q", stdout.String(), expectedOutput)
	}

	// Check that the plant was updated correctly
	updatedPlant, found := Garden[plantName]
	if !found {
		t.Errorf("Plant %q was not found in the garden", plantName)
	} else if updatedPlant.Description != "A beautiful and fragrant flower." {
		t.Errorf("Plant %q description was not updated correctly. Got %q; expected %q", plantName, updatedPlant.Description, "A beautiful and fragrant flower.")
	}
}


The above tets case helps to verify that the code is working as expected and produce the expected output for the editPlant() function in main.go file.



In the case of the test cases provided earlier, they are all useful for checking whether the expected output from the code matches the actual output. By comparing the expected and actual output, we can easily identify any discrepancies and errors in the code.

