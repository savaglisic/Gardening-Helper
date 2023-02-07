package main

import (
	"fmt"
	"net/http"
)

var users = map[string]string{}

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "login.html")
	})

	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "POST" {
			err := r.ParseForm()
			if err != nil {
				http.Error(w, "Invalid request", http.StatusBadRequest)
				return
			}
			username := r.Form.Get("username")
			password := r.Form.Get("password")
			print(username)
			print(password)
			users[username] = password
			fmt.Fprintf(w, "Login successful")
		} else {
			http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		}
	})

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		panic(err)
	}
}
