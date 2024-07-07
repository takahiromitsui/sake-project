package handlers

import (
	"net/http"

	"github.com/takahiromitsui/sake-project/internal/repository"
)

type Handlers struct {
	repo *repository.Repository
}

func NewHandlers(repo *repository.Repository) *Handlers {
	return &Handlers{repo: repo}
}

func (h *Handlers) Home(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, World!"))
}
