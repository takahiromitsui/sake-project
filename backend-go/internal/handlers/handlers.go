package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/takahiromitsui/sake-project/internal/models"
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

type BrandJson struct {
	Brands []models.Brand `json:"brands"`
}

func (h *Handlers) Brands(w http.ResponseWriter, r *http.Request) {
	area := r.PathValue("area")
	brands, err := h.repo.GetBrandsByAreaName(area)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	resp := BrandJson{Brands: brands}
	out, err := json.Marshal(resp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(out)

}