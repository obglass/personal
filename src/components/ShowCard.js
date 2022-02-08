import React from 'react'

class ShowCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            genres: this.props.genres,
            seasons: this.props.seasons,
            complete: this.props.complete,
            streaming: this.props.streaming
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                <h5 className="card-title">{this.state.title} - {this.state.streaming}</h5>
                <h6>Complete: {this.state.complete} Seasons: {this.state.seasons}</h6>
                {this.state.genres?.map(genre => 
                    <p key={genre}>{genre}</p> 
                )}
                </div>
            </div>
        );
    }
}

export default ShowCard