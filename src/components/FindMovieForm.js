import React from 'react'
import Multiselect from 'multiselect-react-dropdown'

class FindMovieForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [
        {name: 'Action/Adventure', id: 1},
        {name: 'Sci-Fi', id: 2},
        {name: 'Mystery', id: 3},
        {name: 'Romance', id: 4},
        {name: 'Nostalgic', id: 5}
      ],
      scenes: [
        {name: 'All', id: 1},
        {name: 'Scenes', id: 2},
        {name: 'Mood', id: 3}
      ],
      streaming: [
        {name: 'Disney+', id: 1},
        {name: 'Netflix', id: 2},
        {name: 'Prime', id: 3},
        {name: 'Hulu', id: 4}
      ],
      selectedGenres: [],
      selectedScene: [],
      selectedStreaming: []
    };

    this.handleSelectedGenres = this.handleSelectedGenres.bind(this);
    this.handleSelectedScene = this.handleSelectedScene.bind(this);
    this.handleSelectedScene = this.handleSelectedScene.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectedGenres(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push({name: options[i].value, key: options[i].value});
      }
    }
    console.log(value)
    this.setState({selectedGenres: value});  }

  handleSelectedScene(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push({name: options[i].value, key: options[i].value});
      }
    }
    console.log(value)
    this.setState({selectedScene: value});  }

  handleSelectedStreaming(e) {
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push({name: options[i].value, key: options[i].value});
      }
    }
    console.log(value)
    this.setState({selectedStreaming: value});  }

  handleSubmit(event) {
    alert('A form was submitted: ' + this.state.selectedGenres + " " + this.state.selectedScene + " " + this.selectedStreaming);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-3">
            <h4>Find a Movie to Watch</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label>
              Genres
              <Multiselect
                options={this.state.genres} 
                displayValue="name"
                onChange={this.handleSelectedGenres} 
              />
            </label>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-3">
            <label>
              Scenes
              <Multiselect
                options={this.state.scenes} 
                displayValue="name" 
                onChange={this.handleSelectedScene} 
              />
            </label>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-3">
            <label>
              Streaming
              <Multiselect
                options={this.state.streaming} 
                displayValue="name" 
                onChange={this.handleSelectedStreaming} 
              />
            </label>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-3">
            <input type="submit" value="Submit" />
          </div>
        </div>
        <br/>
      </form>
      
    );
  }
}

export default FindMovieForm