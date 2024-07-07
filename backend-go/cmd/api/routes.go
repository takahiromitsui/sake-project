package main

import (
	"net/http"

	"github.com/takahiromitsui/sake-project/internal/handlers"
)


func routes(handlers *handlers.Handlers) *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc(("GET /"), handlers.Home)
	return mux
}