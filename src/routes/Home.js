import { useState, useEffect } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {movies.map(({ id, medium_cover_image, title, summary, genres }) => (
            <Movie
              key={id}
              id={id}
              coverImg={medium_cover_image}
              title={title}
              summary={summary}
              genres={genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
