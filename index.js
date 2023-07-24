"use strict";

const inputMovieAdderNode = document.getElementById("inputMovieAdder");
const btnAddMovieNode = document.getElementById("btnAddMovie");
const moviesListNode = document.getElementById("movie-items");

let moviesList = [];

init();

function addMovie() {
  const filmName = getMovieNameFromUser();
  const movieId = moviesList.length + 1;
  setMovie(filmName, movieId);
  saveMoviesToStorage();
  clearInput();
  renderMovies();
}

function getMovieNameFromUser() {
  const filmName = inputMovieAdderNode.value;
  return filmName;
}

function setMovie(filmName, movieId) {
  moviesList.push({
    name: filmName,
    id: movieId,
    checked: false,
  });
}

function saveMoviesToStorage() {
  localStorage.setItem("movies", JSON.stringify(moviesList));
}

function getMoviesFromStorage() {
  const savedMovies = localStorage.getItem("movies");
  if (savedMovies) {
    moviesList = JSON.parse(savedMovies);
    moviesList.forEach((movie) => {
      movie.checked = !!movie.checked;
    });
  }
}

function clearInput() {
  inputMovieAdderNode.value = "";
}

function renderMovies() {
  moviesListNode.innerHTML = "";
  moviesList.forEach((movie) => {
    const movieItem = document.createElement("li");
    movieItem.className = `movie-item ${movie.checked ? "checked" : ""}`;
    movieItem.setAttribute("id", movie.id);

    const movieCheckbox = document.createElement("input");
    movieCheckbox.className = "checkbox";
    movieCheckbox.setAttribute("id", movie.id);
    movieCheckbox.setAttribute("type", "checkbox");
    movieCheckbox.checked = movie.checked;

    const movieLabel = document.createElement("label");
    movieLabel.className = "label";
    movieLabel.setAttribute("for", movie.id);

    const movieName = document.createElement("span");
    movieName.className = "movie-name";
    movieName.innerHTML = movie.name;

    const deleteMovieBtn = document.createElement("button");
    deleteMovieBtn.className = "btn-delete-item";
    deleteMovieBtn.setAttribute("id", movie.id);
    deleteMovieBtn.setAttribute("title", "Удалить");

    movieItem.appendChild(movieCheckbox);
    movieItem.appendChild(movieLabel);
    movieLabel.appendChild(movieName);
    movieItem.appendChild(deleteMovieBtn);

    moviesListNode.appendChild(movieItem);
  });
}

function init() {
  getMoviesFromStorage();
  renderMovies();
}

function hoverOnCheckbox(event) {
  const target = event.target;

  if (target.matches("li") || target.closest("li")) {
    const checkbox = target.querySelector(".checkbox");

    if (checkbox) {
      checkbox.classList.add("hovered");
    }
  }
}

function hoverOffCheckbox(event) {
  const target = event.target;

  if (target.matches("li") || target.closest("li")) {
    const checkbox = target.querySelector(".checkbox");

    if (checkbox) {
      checkbox.classList.remove("hovered");
    }
  }
}

function checkboxChecked(event) {
  const target = event.target;

  const movieItem = target.closest(".movie-item");

  if (movieItem) {
    const deleteBtn = target.closest(".btn-delete-item");

    if (deleteBtn) {
      return;
    }

    const checkbox = movieItem.querySelector(".checkbox");

    if (checkbox) {
      checkbox.classList.toggle("checked");
      movieItem.classList.toggle("checked");
      updateMovieCheckedState(movieItem.id, checkbox.checked);
    }
  }
}

function updateMovieCheckedState(movieId, checked) {
  const movie = moviesList.find((movie) => movie.id === movieId);
  if (movie) {
    movie.checked = checked;
    saveMoviesToStorage();
    renderMovies();
  }
};

function deleteMovie(event) {
    const target = event.target;
  
    const deleteBtn = target.closest(".btn-delete-item");
  
    if (deleteBtn) {
      const movieItem = deleteBtn.closest(".movie-item");
      const movieId = movieItem.id;
  
      // Удалить фильм из списка
      removeMovie(movieId);
      saveMoviesToStorage();
      renderMovies();
    }
};

function removeMovie(movieId) {
    moviesList = moviesList.filter((movie) => movie.id !== movieId);
};


btnAddMovieNode.addEventListener("click", addMovie);
moviesListNode.addEventListener("click", checkboxChecked);
moviesListNode.addEventListener("mouseover", hoverOnCheckbox);
moviesListNode.addEventListener("mouseout", hoverOffCheckbox);
moviesListNode.addEventListener("click", deleteMovie, true);