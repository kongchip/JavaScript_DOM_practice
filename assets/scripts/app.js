const addMovieModal = document.getElementById('add-modal');
const clickAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const entryTextSection = document.getElementById('entry-text');

const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModal.querySelector('.btn--success');
const userInputs = addMovieModal.querySelectorAll('input');
const deleteMoveModal = document.getElementById('delete-modal');

const movies = [];

const toggleBackDrop = () => {
  backdrop.classList.toggle('visible');
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const closeMovieDeletionModal = () => {
  toggleBackDrop();
  deleteMoveModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const movieList = document.getElementById('movie-list');
  movieList.children[movieIndex].remove();
  closeMovieDeletionModal();
};

const startMovieHandler = (movieId) => {
  deleteMoveModal.classList.add('visible');
  toggleBackDrop();
  const cancelDeleteButton = deleteMoveModal.querySelector('.btn--passive');
  let confirmDeleteButton = deleteMoveModal.querySelector('.btn--danger');

  confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));

  confirmDeleteButton = deleteMoveModal.querySelector('.btn--danger');

  cancelDeleteButton.removeEventListener('click', closeMovieModal);
  cancelDeleteButton.addEventListener('click', closeMovieDeletionModal);

  confirmDeleteButton.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMoveElement = document.createElement('li');
  newMoveElement.className = 'movie-element';
  newMoveElement.innerHTML = `
    <div class="movie-element__image">
        <img src = "${imageUrl}" alt = "${title}">
    </div>
    <div class = "movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 starts</p>
    </div>
    `;
  newMoveElement.addEventListener('click', startMovieHandler.bind(null, id));
  const movieList = document.getElementById('movie-list');
  movieList.append(newMoveElement);
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  toggleBackDrop();
};

const clearMovieInput = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackDrop();
  clearMovieInput();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert(
      '올바른 값을 입력해 주세요. \n(Rating에 1과 5사이의 숫자를 입력해 주세요)'
    );
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackDrop();
  clearMovieInput();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

// 배경클릭시 행동 함수 레이아웃 닫기
const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
};

clickAddMovieButton.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
