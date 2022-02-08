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
                <div className="card-body">
                <h5 className="card-title">{this.state.title} - {this.state.streaming} + ({this.state.scenes})</h5>
                {this.state.genres?.map(genre => 
                    <p key={genre}>{genre}</p> 
                )}
                </div>
            </div>
        );
    }
}

export default MovieCard