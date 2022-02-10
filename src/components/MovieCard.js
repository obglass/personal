import React from 'react'
import EditMovieModal from './EditMovieModal'
import {Modal} from 'react-bootstrap'

class MovieCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            genres: this.props.genres,
            scenes: this.props.scenes,
            streaming: this.props.streaming,
            id: this.props.id,
            genreObjects: [],
            sceneObject: [],
            streamingObject: []
        }

        this.createStateObjects = this.createStateObjects.bind(this)
        this.fetchMovie = this.fetchMovie.bind(this)
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }

    componentDidMount() {
        this.createStateObjects()
    }

    createStateObjects() {
        var genreObjectsVar = []
        if (this.state.genres != null) {
            this.state.genres.map(genre => {
                genreObjectsVar.push({"value": genre, "label": genre})
                return genreObjectsVar
            })
        }

        this.setState({
            genreObjects: genreObjectsVar,
            sceneObject: {'value': this.state.scenes, 'label': this.state.scenes},
            streamingObject: {'value': this.state.streaming, 'label': this.state.streaming}
        })
    }

    showModal() {
        this.setState({showModal: true})
    }
    
    hideModal() {
        this.setState({showModal: false})
        this.props.fetchMovies()
    }

    fetchMovie() {
        var base = 'https://api.airtable.com/v0/' + process.env.REACT_APP_TABLE_BASE_ID + '/Movies?api_key=' + process.env.REACT_APP_AIRTABLE_API_KEY

        fetch(base, {
            method: 'get',
            headers: new Headers({'content-type': 'application/json'}),
          })
          .then(res => res.json())
          .then((result) => {
            console.log(result);
            var movie;
            result.records.map(movieMatch => {
                if (movieMatch.id === this.state.id) {
                    movie = movieMatch
                }
                return movie
            })
            // create movie object
            this.setState( {
                title: movie.fields.title,
                genres: movie.fields.genres,
                scenes: movie.fields.scenes,
                streaming: movie.fields.streaming,
                id: movie.id
            })
            this.createStateObjects()

          }).catch(err => {
              console.log(err);
          })
    }
    

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-11">
                            <h5 className="card-title">{this.state.title}</h5>
                        </div>
                        <div className="col-1">
                            <i className="bi bi-pencil-square" onClick={this.showModal}></i>
                            <Modal show={this.state.showModal} onHide={this.hideModal}>
                                <EditMovieModal fetchMovie={this.fetchMovie} hideFunction={this.hideModal} title={this.state.title} genres={this.state.genreObjects} scenes={this.state.sceneObject} streaming={this.state.streamingObject} id={this.state.id}/>
                            </Modal>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                           <b>Genres:</b>
                        </div>
                        <div className="col-4">
                            <b>Streaming on:</b>
                        </div>
                        <div className="col-4">
                            <b>Watch All?</b>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                        {this.state.genres?.map(genre => 
                            <p key={genre}>{genre}</p> 
                        )}
                        </div>
                        <div className="col-4">
                            {this.state.streaming}
                        </div>
                        <div className="col-4">
                            {this.state.scenes}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieCard