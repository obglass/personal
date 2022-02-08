import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
import AddMovieForm from '../components/AddMovieForm'
import Select from 'react-select'

class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      shownMovies: [],
      genres: [
        {value: 'Action/Adventure', label: 'Action/Adventure'},
        {value: 'Sci-Fi', label: 'Sci-Fi'},
        {value: 'Mystery', label: 'Mystery'},
        {value: 'Romance', label: 'Romance'},
        {value: 'Nostalgic', label: 'Nostalgic'}
      ],
      scenes: [
        {value: 'All', label: 'All'},
        {value: 'Scenes', label: 'Scenes'},
        {value: 'Mood', label: 'Mood'}
      ],
      streaming: [
        {value: 'Disney+', label: 'Disney+'},
        {value: 'Netflix', label: 'Netflix'},
        {value: 'Prime', label: 'Prime'},
        {value: 'Hulu', label: 'Hulu'}
      ],
      selectedGenres: [],
      selectedScene: '',
      selectedStreaming: []
    };
    this.handleSelectedGenres = this.handleSelectedGenres.bind(this);
    this.handleSelectedStreaming = this.handleSelectedStreaming.bind(this);
    this.handleSelectedScene = this.handleSelectedScene.bind(this);

  }
 
  componentDidMount() {
    fetch('https://api.airtable.com/v0/' + process.env.REACT_APP_MOVIE_BASE_ID + '/Movies?api_key=' + process.env.REACT_APP_AIRTABLE_API_KEY)
    .then((resp) => resp.json())
    .then(data => {
      var movieArray = []
      data.records.map(movie => {
        var movieObject = {
          title: movie.fields.title,
          genres: movie.fields.genres,
          scenes: movie.fields.scenes,
          streaming: movie.fields.streaming,
          id: movie.id
        }
        movieArray.push(movieObject)
        return movieObject
      })
      this.setState({
        movies: movieArray,
        shownMovies: movieArray
      })
    }).catch(err => {
      // error
    })
  }

  handleSelectedGenres(e) {
    var options = e;
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      values.push(options[i].value)
    }
    this.setState({selectedGenres: values});  
    this.updateMovieList(this.state.selectedStreaming, this.state.selectedScene, values)
  }

  handleSelectedScene(e) {
    this.setState({selectedScene: e.value});  
    this.updateMovieList(this.state.selectedStreaming, e.value, this.state.selectedGenres)
  }

  handleSelectedStreaming(e) {
    var options = e;
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      values.push(options[i].value)
    }
    this.setState({selectedStreaming: values});  
    this.updateMovieList(values, this.state.selectedScene, this.state.selectedGenres
    )
  }

  updateMovieList(streaming, scene, genres) {
    var updatedMovies = []
    var streamMatch = false
    var sceneMatch = false
    var genreMatch = false
    this.state.movies.map(movie => {
      // check streaming
      if (streaming != null && streaming.length !== 0) {
        if (streaming.includes(movie.streaming)) {
          streamMatch = true
        } else {
          streamMatch = false
        }
      } else {
        streamMatch = true
      }
      // check scenes
      if (scene != null && scene.length !== 0) {
        if (scene === movie.scenes) {
          sceneMatch = true
        } else {
          sceneMatch = false
        }
      } else {
        sceneMatch = true
      }
      // check genres
      if (movie.genres != null) {
        if (genres.every(elem => movie.genres.includes(elem))) {
          genreMatch = true
        } else {
          genreMatch = false
        }
      }
      // add matching movie to array
      if (streamMatch && sceneMatch && genreMatch) {
        updatedMovies.push(movie)
      }
      return updatedMovies
    })
    this.setState({shownMovies: updatedMovies})
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <AddMovieForm/>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h1>List of All Movies:</h1>
            </div>
        </div>
        <div className="row">
       {/*<div className="col-3">
            <label>
              Title
              <input></input>
            </label>
          </div> */}
          <div className="col-3">
            <label>
              Genres
              <Select
                options={this.state.genres} 
                isMulti
                displayValue="label" 
                onChange={this.handleSelectedGenres} 
              />
            </label>
          </div>
          <div className="col-3">
            <label>
              Streaming
              <Select
                options={this.state.streaming} 
                isMulti
                displayValue='label'
                onChange={this.handleSelectedStreaming} 
              />
            </label>
          </div>
          <div className="col-3">
            <label>
              Scenes
              <Select
                options={this.state.scenes}
                onChange={this.handleSelectedScene} 
              />
            </label>
          </div>
        </div>    
        <div className="row">
          <div className="col">
            <div className="card-deck">
              {this.state.shownMovies.map(movie => 
                <MovieCard title={movie.title} genres={movie.genres} scenes={movie.scenes} streaming={movie.streaming} key={movie.id} /> 
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;