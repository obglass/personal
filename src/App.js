import React, { Component } from 'react';
import MovieCard from './components/MovieCard';
import Navigation from './components/Navigation'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }
 
  componentDidMount() {
    fetch('https://api.airtable.com/v0/apphinc6LL9Rd2fM8/Movies?api_key=keylJFOgElPG8qeFO')
    .then((resp) => resp.json())
    .then(data => {
      this.setState({ 
        movies: data.records
      });
    }).catch(err => {
      // error
    })
  }

  render() {
    return (
      <div>
        <Navigation/>
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <div className="card-deck">
                {this.state.movies.map(movie => <MovieCard {...movie.fields} /> )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;