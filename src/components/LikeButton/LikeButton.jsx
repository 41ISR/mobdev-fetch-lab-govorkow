import { useState } from 'react';
import './LikeButton.css';

function LikeButton({ imdbID, label = 'фильм' }) {
  const storageKey = imdbID ? `movie-favorite:${imdbID}` : null;

  const [liked, setLiked] = useState(() => {
    if (!storageKey) return false;
    try {
      return localStorage.getItem(storageKey) === 'true';
    } catch {
      return false;
    }
  });

  function handleClick() {
    const next = !liked;
    setLiked(next);

    if (storageKey) {
      try {
        localStorage.setItem(storageKey, String(next));
      } catch {
        // Хранилище недоступно — просто не сохраняем состояние
      }
    }
  }

  return (
    <button
      type="button"
      className={liked ? 'like-button like-button--active' : 'like-button'}
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={
        liked ? `Убрать ${label} из избранного` : `Добавить ${label} в избранное`
      }
    >
      <svg
        className="like-button__icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 20.5s-7.5-4.6-10-9.3C0.4 8 1.6 4.6 4.7 3.6c2.2-.7 4.4.1 5.6 2 .3.4.5.8.7 1.2.2-.4.4-.8.7-1.2 1.2-1.9 3.4-2.7 5.6-2 3.1 1 4.3 4.4 2.7 7.6-2.5 4.7-10 9.3-10 9.3Z" />
      </svg>
    </button>
  );
}

export default LikeButton;
