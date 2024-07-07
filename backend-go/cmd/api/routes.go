package main

import "net/http"


func routes() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc(("GET /"), func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello, World!"))
	})
	return mux
}