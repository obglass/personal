import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import Select from 'react-select'

class AddMovieModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      selectedScene: '',
      selectedStreaming: [],
      selectedTitle: ''
    };

    this.handleSelectedGenres = this.handleSelectedGenres.bind(this);
    this.handleSelectedScene = this.handleSelectedScene.bind(this);
    this.handleSelectedStreaming = this.handleSelectedStreaming.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({chosenTitle: e.target.value})
  }

  handleSelectedGenres(e) {
    var options = e;
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      values.push(options[i].value)
    }
    this.setState({selectedGenres: values});  
  }

  handleSelectedScene(e) {
    this.setState({selectedScene: e.value});  
  }

  handleSelectedStreaming(e) {
    this.setState({selectedStreaming: e.value}); 
  }

  handleSubmit(event) {
    var base = 'https://api.airtable.com/v0/' + process.env.REACT_APP_TABLE_BASE_ID + '/Movies?api_key=' + process.env.REACT_APP_AIRTABLE_API_KEY
    const body = JSON.stringify({"fields": {
        "title": document.getElementById('titleInput').value,
        "scenes": this.state.selectedScene,
        "streaming": this.state.selectedStreaming,
        "genres": this.state.selectedGenres
      }})

    fetch(base, {
      method: 'post',
      headers: new Headers({'content-type': 'application/json'}),
      body: body
    })
    .then(res => res.json())
    .then((result) => {
      this.props.hideFunction()
      console.log(result);
    }).catch(err => {
        console.log(err);
    })
  }

  render() {
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>Add a Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <label>
                  Title
                  <input 
                    type="text"
                    id="titleInput"
                    value={this.state.chosenTitle}
                    // onChange={this.handleTitleChange} 
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
                    id="genreSelect"
                    options={this.state.genres} 
                    displayValue="label"
                    onChange={this.handleSelectedGenres} 
                  />
                </label>
              </div>
            </div>
            <br/>
            <div className="row">
              <div className="col-12">
                <label>
                  Scenes
                  <Select 
                    id="sceneSelect"
                    options={this.state.scenes} 
                    displayValue="label" 
                    onChange={this.handleSelectedScene} 
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
                    id="streamSelect"                  
                    options={this.state.streaming} 
                    displayValue="label" 
                    onChange={this.handleSelectedStreaming} 
                  />
                </label>
              </div>
            </div>
            <br/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.hideModal}>Close</Button>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
          </Modal.Footer>
        </div>
    );
  }
}

export default AddMovieModal