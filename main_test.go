package main

import (
	"bufio"
	"bytes"
	"log"
	"os"
	"strings"
	"testing"
)

/*
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
}*/

/*func TestAddPlant(t *testing.T) {
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
	addPlant()

	// Compare actual output with expected output
	if !strings.Contains(stdout.String(), expectedOutput) {
		t.Errorf("addPlant() output = %q; expected %q", stdout.String(), expectedOutput)
	}
}*/

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
	editPlant()

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
	reader1 := bufio.NewReader(strings.NewReader(input1))
	output1 := &bytes.Buffer{}
	log.SetOutput(output1)
	addPlant(reader1)
	if _, ok := Garden["rose"]; !ok {
		t.Errorf("Failed to add plant with name 'rose'")
	}
	if output1.String() != expectedOutput1 {
		t.Errorf("Output incorrect. Expected '%s', but got '%s'", expectedOutput1, output1.String())
	}
}
