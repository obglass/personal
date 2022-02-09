import React from 'react'

class MovieCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            genres: this.props.genres,
            scenes: this.props.scenes,
            streaming: this.props.streaming
        }
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
                            <i className="bi bi-pencil-square"></i>
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