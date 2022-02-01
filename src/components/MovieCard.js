import React from 'react'

class MovieCard extends React.Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            title: this.props.title,
            genres: this.props.genres,
            scenes: this.props.scenes,
            streaming: this.props.streaming
        }
    }
    render() {
        console.log(this.state)
        return (
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">{this.state.title}</h5>
                {/* {this.state.genres.map(genre => 
                    <p>genre</p> 
                )} */}
                </div>
            </div>
        );
    }
}

export default MovieCard