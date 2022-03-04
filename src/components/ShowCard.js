import React from 'react'
import EditShowModal from './EditShowModal'
import {Modal} from 'react-bootstrap'

class ShowCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title,
            genres: this.props.genres,
            seasons: this.props.seasons,
            complete: this.props.complete,
            streaming: this.props.streaming,
            id: this.props.id,
            genreObjects: [],
            streamingObject: [],
            completeObject: []
        }
        this.createStateObjects = this.createStateObjects.bind(this)
        this.fetchShow = this.fetchShow.bind(this)
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
            streamingObject: {'value': this.state.streaming, 'label': this.state.streaming},
            completeObject: {'value': this.state.complete, 'label': this.state.complete}
        })
    }

    showModal() {
        this.setState({showModal: true})
    }
    
    hideModal() {
        this.setState({showModal: false})
        this.props.fetchShows()
    }

    fetchShow() {
        var base = 'https://api.airtable.com/v0/' + process.env.REACT_APP_TABLE_BASE_ID + '/Shows?api_key=' + process.env.REACT_APP_AIRTABLE_API_KEY

        fetch(base, {
            method: 'get',
            headers: new Headers({'content-type': 'application/json'}),
          })
          .then(res => res.json())
          .then((result) => {
            console.log(result);
            var show;
            result.records.map(showMatch => {
                if (showMatch.id === this.state.id) {
                    show = showMatch
                }
                return show
            })
            // create movie object
            this.setState( {
                title: show.fields.title,
                seasons: show.fields.seasons,
                genres: show.fields.genres,
                streaming: show.fields.streaming,
                complete: show.fields.complete,
                id: show.id
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
                            <h5 className="card-title">{this.state.title} ({this.state.seasons} Seasons)</h5>
                        </div>
                        <div className="col-1">
                        <i className="bi bi-pencil-square" onClick={this.showModal}></i>
                            <Modal show={this.state.showModal} onHide={this.hideModal}>
                                <EditShowModal fetchShow={this.fetchShow} hideFunction={this.hideModal} title={this.state.title} seasons={this.state.seasons} genres={this.state.genreObjects} complete={this.state.completeObject} streaming={this.state.streamingObject} id={this.state.id}/>
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