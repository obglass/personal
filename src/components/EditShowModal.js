import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import Select from 'react-select'

class EditShowModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTitle: this.props.title,
      currentGenres: this.props.genres,
      currentComplete: this.props.complete,
      currentStreaming: this.props.streaming,
      currentSeasons: this.props.seasons,
      id: this.props.id,
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
      selectedComplete: '',
      selectedStreaming: '',
      selectedTitle: '',
      selectedSeasons: 1
    };

    this.handleSelectedGenres = this.handleSelectedGenres.bind(this);
    this.handleSelectedComplete = this.handleSelectedComplete.bind(this);
    this.handleSelectedStreaming = this.handleSelectedStreaming.bind(this);
    this.handleSeasonChange = this.handleSeasonChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({selectedTitle: e.target.value})
  }

  handleSeasonChange(e) {
    this.setState({selectedSeasons: e.target.value})
  }

  handleSelectedGenres(e) {
    var options = e;
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      values.push(options[i].value)
    }
    this.setState({selectedGenres: values});  
  }

  handleSelectedComplete(e) {
    this.setState({selectedComplete: e.value});  
  }

  handleSelectedStreaming(e) {
    this.setState({selectedStreaming: e.value}); 
  }

  handleSubmit(event) {
    
    var complete = ''
    var stream = ''
    var genres = []

    if (this.state.selectedComplete === '') {
      complete = this.state.currentComplete.value
    } else {
      complete = this.state.selectedComplete
    }
    
    if (this.state.selectedStreaming === '') {
      stream = this.state.currentStreaming.value
    } else {
      stream = this.state.selectedStreaming
    }

    if (this.state.selectedGenres.length === 0) {
      this.state.currentGenres.map(genre => {
        genres.push(genre.value)
        return genres
      })
    } else {
      this.state.selectedGenres.map(genre => {
        genres.push(genre)
        return genres
      })
    }

    var base = 'https://api.airtable.com/v0/' + process.env.REACT_APP_TABLE_BASE_ID + '/Shows?api_key=' + process.env.REACT_APP_AIRTABLE_API_KEY
    const body = JSON.stringify(
      {
        "records": [
          {
            "id": this.state.id,
            "fields": {
              "title": document.getElementById('editedTitle').value,
              "complete": complete,
              "streaming": stream,
              "genres": genres,
              "seasons": Number(document.getElementById('editedSeasons').value)
            }
          }
        ]
      }
    )

    fetch(base, {
      method: 'put',
      headers: new Headers({'content-type': 'application/json'}),
      body: body
    })
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      this.props.fetchShow()
      this.props.hideFunction()
    }).catch(err => {
        console.log(err);
    })
  }

  render() {
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Edit a Show</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <label>
                  Title
                  <input 
                    type="text"
                    id='editedTitle'
                    defaultValue={this.state.currentTitle}
                    className="form-control" 
                    aria-label="Default" 
                    aria-describedby="inputGroup-sizing-default"/>
                </label>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <label>
                  Seasons
                  <input 
                    type="number"
                    id='editedSeasons'
                    defaultValue={this.state.currentSeasons}
                    className="form-control" 
                    aria-label="Default" 
                    aria-describedby="inputGroup-sizing-default"/>
                </label>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <label>
                  Genres
                  <Select
                    isMulti
                    options={this.state.genres} 
                    displayValue="label"
                    onChange={this.handleSelectedGenres} 
                    defaultValue={this.state.currentGenres}
                  />
                </label>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <label>
                  Complete
                  <Select 
                    options={this.state.complete} 
                    displayValue="label" 
                    onChange={this.handleSelectedComplete} 
                    defaultValue={this.state.currentComplete}
                  />
                </label>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <label>
                  Streaming
                  <Select    
                    options={this.state.streaming} 
                    displayValue="label" 
                    onChange={this.handleSelectedStreaming} 
                    defaultValue={this.state.currentStreaming}
                  />
                </label>
              </div>
            </div>
            <br/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.hideFunction}>Close</Button>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
          </Modal.Footer>
        </div>
    );
  }
}

export default EditShowModal