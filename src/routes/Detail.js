import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(movie);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>제목: {movie.title}</h1>
          <h2>제작연도: {movie.year}년</h2>
          <h2>평점: {movie.rating}점</h2>
          <h2>상영시간: {movie.runtime}분</h2>
          <ul>
            {movie.genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
          <img src={movie.large_cover_image}></img>
          <h2>{movie.description_full}</h2>
        </div>
      )}
    </div>
  );
}

export default Detail;
