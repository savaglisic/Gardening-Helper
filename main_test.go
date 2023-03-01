package main

import (
	"bytes"
	"io"
	"os"
	"testing"
)

func TestVegetablePlant(t *testing.T) {
	// Test Case 1: Successful search for a vegetable record
	input := "tomato\nq\n"
	oldStdin := os.Stdin
	defer func() { os.Stdin = oldStdin }()
	r, w, _ := os.Pipe()
	os.Stdin = r
	go func() {
		defer w.Close()
		io.WriteString(w, input)
	}()

	var buf bytes.Buffer
	//out := &buf
	vegetablePlant()

	expectedOutput := "Enter a vegetable to search for (or 'q' to quit): Name: tomato\nIdeal Temperature for the plant: 21-24\nPH: 6.0-7.0\nSoil:  well-drained soil\nWaterlevel:  1-2 inches\n\nEnter a vegetable to search for (or 'q' to quit): "
	if buf.String() != expectedOutput {
		t.Errorf("Test Case 1 failed: expected %q but got %q", expectedOutput, buf.String())
	}

	// Test Case 2: Unsuccessful search for a vegetable record
	input = "carrot\nq\n"
	r, w, _ = os.Pipe()
	os.Stdin = r
	go func() {
		defer w.Close()
		io.WriteString(w, input)
	}()

	buf.Reset()
	//out = &buf
	vegetablePlant()

	expectedOutput = "Enter a vegetable to search for (or 'q' to quit): Sorry, the vegetable you entered was not found in the database.\n\nEnter a vegetable to search for (or 'q' to quit): "
	if buf.String() != expectedOutput {
		t.Errorf("Test Case 2 failed: expected %q but got %q", expectedOutput, buf.String())
	}

	// Test Case 3: Quit the function using "q" as input
	input = "q\n"
	r, w, _ = os.Pipe()
	os.Stdin = r
	go func() {
		defer w.Close()
		io.WriteString(w, input)
	}()

	buf.Reset()
	//out = &buf
	vegetablePlant()

	expectedOutput = "Enter a vegetable to search for (or 'q' to quit): "
	if buf.String() != expectedOutput {
		t.Errorf("Test Case 3 failed: expected %q but got %q", expectedOutput, buf.String())
	}
}
