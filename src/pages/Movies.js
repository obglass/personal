import React, { Component } from 'react';
import MovieCard from '../components/MovieCard';
import AddMovieModal from '../components/AddMovieModal'
import Select from 'react-select'
import {Modal, Button} from 'react-bootstrap'

class Movies extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      shownMovies: [],
      chosenTitle: '',
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
        {value: 'Hulu', label: 'Hulu'},
        {value: 'HBO Max', label: 'HBO Max'}
      ],
      selectedGenres: [],
      selectedScene: '',
      selectedStreaming: [],
      showModal: false
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSelectedGenres = this.handleSelectedGenres.bind(this);
    this.handleSelectedStreaming = this.handleSelectedStreaming.bind(this);
    this.handleSelectedScene = this.handleSelectedScene.bind(this);
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }
 
  componentDidMount() {
    this.fetchMovies()
  }
  
  fetchMovies() {
    fetch('https://api.airtable.com/v0/' + process.env.REACT_APP_TABLE_BASE_ID + '/Movies?api_key=' + process.env.REACT_APP_AIRTABLE_API_KEY)
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
      console.log(err)
    })
  }

  showModal() {
    this.setState({showModal: true})
  }

  hideModal() {
    this.setState({showModal: false})
    this.fetchMovies()
  }

  handleTitleChange(e) {
    this.setState({chosenTitle: e.target.value})
    this.updateMovieList(e.target.value, this.state.selectedStreaming, this.state.selectedScene, this.state.selectedGenres)
  }

  handleSelectedGenres(e) {
    var options = e;
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      values.push(options[i].value)
    }
    this.setState({selectedGenres: values});  
    this.updateMovieList(this.state.chosenTitle, this.state.selectedStreaming, this.state.selectedScene, values)
  }

  handleSelectedScene(e) {
    this.setState({selectedScene: e.value});  
    this.updateMovieList(this.state.chosenTitle, this.state.selectedStreaming, e.value, this.state.selectedGenres)
  }

  handleSelectedStreaming(e) {
    var options = e;
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      values.push(options[i].value)
    }
    this.setState({selectedStreaming: values});  
    this.updateMovieList(this.state.chosenTitle, values, this.state.selectedScene, this.state.selectedGenres
    )
  }

  updateMovieList(title, streaming, scene, genres) {
    var updatedMovies = []
    var titleMatch = false
    var streamMatch = false
    var sceneMatch = false
    var genreMatch = false
    this.state.movies.map(movie => {
      // check title
      if (title != null) {
        if (movie.title.includes(title)) {
          titleMatch = true
        } else {
          titleMatch = false
        }
      } else {
        titleMatch = true
      }
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
      if (titleMatch && streamMatch && sceneMatch && genreMatch) {
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
          <div className="col-12">
            <h1>List of All Movies:</h1>
            </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              Title
              <input 
                type="text"
                value={this.state.chosenTitle}
                onChange={this.handleTitleChange} 
                className="form-control" 
                aria-label="Default" 
                aria-describedby="inputGroup-sizing-default"/>
            </label>
          </div>
          <div className="col">
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
          <div className="col">
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
          <div className="col">
            <label>
              Scenes
              <Select
                options={this.state.scenes}
                onChange={this.handleSelectedScene} 
              />
            </label>
          </div>
          <div className="col text-center my-auto">
            <Button 
              variant="primary"
              onClick={this.showModal}
            >
            Add Movie
            </Button>
            <Modal show={this.state.showModal} onHide={this.hideModal}>
              <AddMovieModal hideFunction={this.hideModal}/>
            </Modal>
          </div>
        </div>  
        <br/>  
        <div className="row">
          <div className="col">
            <div className="card-deck">
              {this.state.shownMovies.map(movie => 
                <MovieCard title={movie.title} genres={movie.genres} scenes={movie.scenes} streaming={movie.streaming} key={movie.id} /> 
              )}
            </div>
          </div>
        </div>
        <br/>
      </div>
    );
  }
}

export default Movies;