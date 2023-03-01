package main

import (
	"bytes"
	"encoding/json"

	//"io/ioutil"
	//"io/outil"
	"os"
	//"reflect"
	"strings"
	"testing"
)

func TestVegetablePlant(t *testing.T) {
	input := "Raddish\nq\n"
	expectedOutput := "Enter a vegetable to search for (or 'q' to quit): Raddish\nName: Raddish\nIdeal Temperature for the plant: 31.0761254\nPH: 7.5\nSoil: Well-drained Sandy Soil\nWaterlevel: High \nSpace: 0.028\nEnter a vegetable to search for (or 'q' to quit): Sorry, the vegetable you entered was not found in the database.\n"

	// Set input buffer
	inputBuf := strings.NewReader(input)
	// Set output buffer
	outputBuf := &bytes.Buffer{}

	// Call vegetablePlant with the modified input and output streams
	vegetablePlant(inputBuf, outputBuf)

	if outputBuf.String() != expectedOutput {
		t.Errorf("Unexpected output.\nExpected:\n%s\nActual:\n%s", expectedOutput, outputBuf.String())
	}
}

func vegetablePlant(inputBuf *strings.Reader, outputBuf *bytes.Buffer) {
	panic("unimplemented")
}

func TestRetrieveMyPlants(t *testing.T) {
	// Create a test JSON file
	testPlants := []Plant{
		{CommonName: "Rose", ScientificName: "Rosa", Genus: "Rosaceae", Rank: "species"},
		{CommonName: "Tulip", ScientificName: "Tulipa", Genus: "Liliaceae", Rank: "genus"},
		{CommonName: "Lavender", ScientificName: "Lavandula", Genus: "Lamiaceae", Rank: "genus"},
	}
	testFile, err := os.CreateTemp("", "test-plants-*.json")
	if err != nil {
		t.Fatalf("Failed to create test file: %v", err)
	}
	defer os.Remove(testFile.Name())
	encoder := json.NewEncoder(testFile)
	for _, plant := range testPlants {
		if err := encoder.Encode(plant); err != nil {
			t.Fatalf("Failed to encode test data: %v", err)
		}
	}
	testFile.Close()

	// Call the function being tested
	plants, err := retrieveMyPlants()
	if err != nil {
		t.Fatalf("Failed to retrieve plants: %v", err)
	}

	// Assert that the retrieved plants match the test data
	if len(plants) != len(testPlants) {
		t.Errorf("Expected %d plants, but got %d", len(testPlants), len(plants))
	}
	for i := range testPlants {
		if plants[i].CommonName != testPlants[i].CommonName || plants[i].ScientificName != testPlants[i].ScientificName || plants[i].Genus != testPlants[i].Genus || plants[i].Rank != testPlants[i].Rank {
			t.Errorf("Expected plant %+v, but got %+v", testPlants[i], plants[i])
		}
	}
}
