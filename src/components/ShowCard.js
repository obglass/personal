import React from 'react'

class ShowCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            genres: this.props.genres,
            seasons: this.props.seasons,
            complete: this.props.complete,
            streaming: this.props.streaming,
            id: this.props.id
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-11">
                            <h5 className="card-title">{this.state.title} ({this.state.seasons} Seasons)</h5>
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
                            <b>Complete?</b>
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
                            {this.state.complete}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowCard