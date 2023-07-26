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
};

function getMovieNameFromUser() {
  const filmName = inputMovieAdderNode.value;
  return filmName;
};

function setMovie(filmName, movieId) {
  moviesList.push({
    name: filmName,
    id: movieId,
    // checked: false,
  });
};

function saveMoviesToStorage() {
  localStorage.setItem("movies", JSON.stringify(moviesList));
};

function getMoviesFromStorage() {
  const savedMovies = localStorage.getItem("movies");
  if (savedMovies) {
    moviesList = JSON.parse(savedMovies);
  }
};

function clearInput() {
  inputMovieAdderNode.value = "";
};

function renderMovies() {
  moviesListNode.innerHTML = "";
  moviesList.forEach((movie) => {
    const movieItem = document.createElement("li");
    movieItem.className = "movie-item";
    movieItem.setAttribute("id", movie.id);

    const movieCheckbox = document.createElement("input");
    movieCheckbox.className = "checkbox";
    movieCheckbox.setAttribute("type", "checkbox");
    movieCheckbox.setAttribute("checked", "false");
    movieCheckbox.checked = movie.checked;

    const fakecheckbox = document.createElement("span");
    fakecheckbox.className = "fakecheckbox";
    fakecheckbox.checked = movie.checked;

    const movieLabel = document.createElement("label");
    movieLabel.className = "label";

    const movieName = document.createElement("span");
    movieName.className = "movie-name";
    movieName.innerHTML = movie.name;

    const deleteMovieBtn = document.createElement("button");
    deleteMovieBtn.className = "btn-delete-item";
    deleteMovieBtn.setAttribute("id", movie.id);
    deleteMovieBtn.setAttribute("title", "Удалить");

    movieLabel.appendChild(movieCheckbox);
    movieItem.appendChild(movieLabel);
    movieLabel.appendChild(fakecheckbox); 
    movieLabel.appendChild(movieName);
    movieItem.appendChild(deleteMovieBtn);

    moviesListNode.appendChild(movieItem);
  });
};

function init() {
  getMoviesFromStorage();
  renderMovies();
};

// удалить фильм 
function deleteMovie(event) {
  if (event.target.dataset.action === "delete") {
    // родительский элемент
    const parentNode = event.target.closest(".movie-item");

    // находим id элемента родителя
    const idParentNode = Number(parentNode.id);

    // находим индекс
    const index = moviesList.findIndex(function (movie) {
      if (movie.id === idParentNode) {
        return true;
      }
    });

    moviesList.splice(index, 1);

    parentNode.remove();

    saveToLocalStorage();
  }
}

btnAddMovieNode.addEventListener("click", addMovie);
const btnDeletMovieNode = document.querySelector(".btn-delete-item");
btnDeletMovieNode.addEventListener("click", deleteMovie);