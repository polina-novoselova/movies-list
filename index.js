"use strict";

const inputMovieAdderNode = document.getElementById("inputMovieAdder");
const btnAddMovieNode = document.getElementById("btnAddMovie");
const moviesListNode = document.getElementById("movie-items");

let moviesList = [];

// init();

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
    movieLabel.appendChild(movieName);
    movieItem.appendChild(deleteMovieBtn);

    moviesListNode.appendChild(movieItem);
  });
};

function init() {
  getMoviesFromStorage();
  renderMovies();
};

document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".checkbox input");

  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("click", function () {
      this.setAttribute("checked", this.checked);
    });
  });
});

document.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("checkbox")) {
    const checkbox = target.querySelector("input");

    if (target.classList.contains("active")) {
      checkbox.checked = false;
    } else {
      checkbox.checked = true;
    }

    target.classList.toggle("active");
    event.preventDefault();
  }
});

// // Получаем все элементы с классом "movies-item"
// const movieItems = document.querySelectorAll('.checkbox');

// // Функция для обработки клика 
// function handleMovieItemClick(event) {
//   // Проверяем был ли клип что бы не менять чекед checked
//   if (!event.target.matches('input[type="checkbox"]')) {
//     // Добавляем класс актив к карточке и дочкам
//     this.classList.toggle('active');
//     // Ищем чекбокс внутри карточки и меняем его атрибут checked с false на true
//     const checkbox = this.querySelector('input[type="checkbox"]');
//     checkbox.checked = !checkbox.checked;
//   }
// }
// movieItems.forEach(item => {
//   item.addEventListener('click', handleMovieItemClick);
// });


// function deleteMovie(event) {
//     const target = event.target;

//     const deleteBtn = target.closest(".btn-delete-item");

//     if (deleteBtn) {
//       const movieItem = deleteBtn.closest(".movie-item");
//       const movieId = movieItem.id;

//       // Удалить фильм из списка
//       removeMovie(movieId);
//       saveMoviesToStorage();
//       renderMovies();
//     }
// };

// function removeMovie(movieId) {
//     moviesList = moviesList.filter((movie) => movie.id !== movieId);
// };

btnAddMovieNode.addEventListener("click", addMovie);
// moviesListNode.addEventListener("click", deleteMovie, true);
