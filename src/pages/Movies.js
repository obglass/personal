import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
import FindMovieForm from '../components/FindMovieForm'

class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }
 
  componentDidMount() {
    fetch('https://api.airtable.com/v0/' + process.env.REACT_APP_MOVIE_BASE_ID + '/Movies?api_key=' + process.env.REACT_APP_AIRTABLE_API_KEY)
    .then((resp) => resp.json())
    .then(data => {
      console.log(data.records)
      this.setState({ 
        movies: data.records
      });
    }).catch(err => {
      // error
    })

    this.state.movies.map(movie => {
      console.log(movie)
      return movie
    })
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <FindMovieForm/>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card-deck">
              <h1>List of All Movies:</h1>
              {this.state.movies.map(movie => 
                // <MovieCard title={movie.title} genres={movie.genres} scenes={movie.scenes} streaming={movie.streaming} key={movie.id} /> 
                <MovieCard {...movie.fields} key={movie.id} /> 
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;