package main

import (
	"bytes"
	"strings"
	"testing"
)

func TestVegetablePlant(t *testing.T) {
	input := "Raddish\nq\n"
	expectedOutput := "Enter a vegetable to search for (or 'q' to quit): Name: Raddish\nIdeal Temperature for the plant: 31.0761254\nPH: 7.5\nSoil: Well-drained Sandy Soil\nWaterlevel: High \nSpace: 0.028\nEnter a vegetable to search for (or 'q' to quit): Sorry, the vegetable you entered was not found in the database.\n"

	in := strings.NewReader(input)
	out := &bytes.Buffer{}
	vegetablePlant(in, out)

	if out.String() != expectedOutput {
		t.Errorf("Unexpected output.\nExpected:\n%s\nActual:\n%s", expectedOutput, out.String())
	}
}
