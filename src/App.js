import { useState } from "react";
import { useEffect } from "react";
import Starrating from "./Starrating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>UsePoPcorn</h1>
    </div>
  );
}
function Numresults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length || 0}</strong> results
    </p>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

// function Watchbox() {
//   const [isOpen2, setIsOpen2] = useState(true);
//   const [watched, setWatched] = useState(tempWatchedData);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <Watchedmovielist watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
function Watchedmovielist({ watched, ondeletewatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Watchedmovie
          movie={movie}
          key={movie.imdbID}
          ondeletewatched={ondeletewatched}
        />
      ))}
    </ul>
  );
}
function Watchedmovie({ movie, ondeletewatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => ondeletewatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function Movielist({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
// function Movie({ movie, onSelectMovie }) {
//   return (
//     <li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
//       <img src={movie.Poster} alt={`${movie.Title} poster`} />
//       <h3>{movie.Title}</h3>
//       <div>
//         <p>
//           <span>🗓</span>
//           <span>{movie.Year}</span>
//         </p>
//       </div>
//     </li>
//   );
// }
function Movie({ movie, onSelectMovie, onAddWatched }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)} key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
        <p>{movie.imdbRating}</p>
      </div>
    </li>
  );
}

function Moviedetails({ selectedid, Onclosemovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isloading, setisloading] = useState(false);
  const [userrating, setuserrating] = useState(0);
  const iswatched = watched.map((movie) => movie.imdbID).includes(selectedid);
  // console.log(iswatched);

  const {
    Title: title,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    Year: year,
    Runtime: runtime,
    Plot: plot,

    Poster: poster,
  } = movie;
  function Handleadd() {
    const newwatchedmovie = {
      imdbID: selectedid,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userrating,
    };
    onAddWatched(newwatchedmovie);
    Onclosemovie();
  }
  useEffect(
    function () {
      async function getMoviedetails() {
        setisloading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedid}`
        );
        const data = await res.json();
        // console.log(data);
        setMovie(data);
        setisloading(false);
      }
      getMoviedetails();
    },
    [selectedid]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
    },
    [title]
  );
  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={Onclosemovie}>
              &larr;
            </button>

            <img src={poster} alt={`poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>{imdbRating} IMDB rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!iswatched ? (
                <>
                  <Starrating
                    maxrating={10}
                    size={24}
                    onsetrating={setuserrating}
                  />
                  <button className="btn-add" onClick={Handleadd}>
                    +Add movie
                  </button>
                </>
              ) : (
                <p>
                  You rated this movie with{" "}
                  {watched.find((m) => m.imdbID === selectedid)?.userRating} 🌟
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
      {/* {selectedid} */}
    </div>
  );
}

const KEY = "36daaefc";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [error, seterror] = useState("");
  const [selectedid, setselectedid] = useState(null);
  // const tempquery = "interstellar";
  function handleSelectMovie(id) {
    setselectedid((selectedid) => (id === selectedid ? null : id));
  }
  function Onclosemovie() {
    setselectedid(null);
  }
  function handleaddwatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handledelete(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  // useEffect(
  //   function () {
  //     async function fetchMovies() {
  //       try {
  //         setisloading(true);
  //         seterror("");
  //         const res = await fetch(
  //           `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
  //         );
  //         if (!res.ok) throw new Error("Something went wrong");

  //         const data = await res.json();
  //         if (data.Response === "False") {
  //           throw new Error("Movie not found");
  //         }
  //         setMovies(data.Search);
  //         // console.log(data.Search);
  //         // setisloading(false);

  //         // .then((res) => res.json())
  //         // .then((data) => setMovies(data.Search));
  //       } catch (err) {
  //         console.error(err);
  //         seterror(err.message);
  //       } finally {
  //         setisloading(false);
  //       }
  //     }
  //     if (query.length < 3) {
  //       setMovies([]);
  //       seterror("");
  //       return;
  //     }
  //     fetchMovies();
  //   },
  //   [query]
  // ); // run only once when App mounts
  useEffect(() => {
    const controller = new AbortController(); // for cancelling old requests
    const timer = setTimeout(async () => {
      if (query.length < 3) {
        setMovies([]);
        seterror("");
        return;
      }

      try {
        setisloading(true);
        seterror("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          seterror(err.message);
        }
      } finally {
        setisloading(false);
      }
    }, 500); // delay 500ms after user stops typing

    return () => {
      clearTimeout(timer); // clear timeout on cleanup
      controller.abort(); // cancel previous fetch
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isloading && <Loader />}
          {!isloading && !error && (
            <Movielist movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <Errormssg message={error} />}
        </Box>
        <Box>
          <>
            {selectedid ? (
              <Moviedetails
                selectedid={selectedid}
                Onclosemovie={Onclosemovie}
                onAddWatched={handleaddwatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummary watched={watched} />
                <Watchedmovielist
                  watched={watched}
                  ondeletewatched={handledelete}
                />
              </>
            )}
          </>
        </Box>
      </Main>
    </>
  );
}
function Errormssg({ message }) {
  return (
    <p className="error">
      <span>!!!</span>
      {message}
    </p>
  );
}
function Loader() {
  return <p className="loader">Loading...</p>;
}
