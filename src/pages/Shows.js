import React, { Component } from 'react';
import ShowCard from '../components/ShowCard';
import AddShowModal from '../components/AddShowModal'
import Select from 'react-select'
import {Modal, Button} from 'react-bootstrap'

class Shows extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shows: [],
      shownShows: [],
      chosenTitle: '',
      seasons: 0,
      complete: [
        {value: 'yes', label: 'Yes'},
        {value: 'no', label: 'No'},
        {value: 'cancelled', label: 'Cancelled'},
      ],
      selectedGenres: [],
      selectedSeason: '',
      selectedComplete: '',
      selectedStreaming: [],
      showModal: false
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSelectedGenres = this.handleSelectedGenres.bind(this);
    this.handleSelectedStreaming = this.handleSelectedStreaming.bind(this);
    this.handleSelectedSeason = this.handleSelectedSeason.bind(this);
    this.handleSelectedComplete = this.handleSelectedComplete.bind(this);
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }
 
  componentDidMount() {
    this.fetchShows()
  }
  
  fetchShows() {
    fetch('https://api.airtable.com/v0/' + process.env.REACT_APP_TABLE_BASE_ID + '/Shows?api_key=' + process.env.REACT_APP_AIRTABLE_API_KEY)
    .then((resp) => resp.json())
    .then(data => {
      var showArray = []
      var genreOptions = []
      var genreObjects = []
      var streamingOptions = []
      var streamingObjects = []

      data.records.map(show => {
        // add genre options to array
        if(show.fields.genres != null) {
          show.fields.genres.map(genre => {
            if (!genreOptions.includes(genre)) {
              genreOptions.push(genre)
            } 
            return genreOptions
          })
        }
        // add streaming options to array
        if (show.fields.streaming != null && !streamingOptions.includes(show.fields.streaming)) {
          streamingOptions.push(show.fields.streaming);
        }

        var showObject = {
          title: show.fields.title,
          genres: show.fields.genres,
          seasons: show.fields.seasons,
          complete: show.fields.complete,
          streaming: show.fields.streaming,
          id: show.id
        }
        showArray.push(showObject)
        return showObject
      })
      genreOptions.forEach(genre => {
        genreObjects.push({'value': genre, 'label': genre})
      })
      streamingOptions.forEach(streaming => {
        streamingObjects.push({'value': streaming, 'label': streaming})
      })
      this.setState({
        shows: showArray,
        shownShows: showArray,
        genres: genreObjects,
        streaming: streamingObjects
      })
    }).catch(err => {
      console.log(err)
    })
  }

  showModal() {
    this.setState({showModal: true})
  }

  hideModal() {
    this.setState({showModal: false})
    this.fetchShows()
  }

  handleTitleChange(e) {
    this.setState({chosenTitle: e.target.value})
    this.updateShowList(e.target.value, this.state.selectedStreaming, this.state.selectedSeason, this.state.selectedComplete, this.state.selectedGenres)
  }

  handleSelectedGenres(e) {
    var options = e;
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      values.push(options[i].value)
    }
    this.setState({selectedGenres: values});  
    this.updateShowList(this.state.chosenTitle, this.state.selectedStreaming, this.state.selectedSeason, this.state.selectedComplete, values)
  }

  handleSelectedSeason(e) {
    this.setState({selectedSeason: parseInt(e.target.value)});  
    this.updateShowList(this.state.chosenTitle, this.state.selectedStreaming, parseInt(e.target.value), this.state.selectedComplete, this.state.selectedGenres)
  }

  handleSelectedComplete(e) {
    this.setState({selectedComplete: e.value});  
    this.updateShowList(this.state.chosenTitle, this.state.selectedStreaming, this.state.selectedSeason, e.value, this.state.selectedGenres)
  }

  handleSelectedStreaming(e) {
    var options = e;
    var values = [];
    for (var i = 0, l = options.length; i < l; i++) {
      values.push(options[i].value)
    }
    this.setState({selectedStreaming: values});  
    this.updateShowList(this.state.chosenTitle, values, this.state.selectedSeason, this.state.selectedComplete, this.state.selectedGenres)
  }

  updateShowList(title, streaming, season, complete, genres) {
    var updatedShows = []
    var titleMatch = false
    var streamMatch = false
    var seasonMatch = false
    var genreMatch = false
    var completeMatch = false
    this.state.shows.map(show => {
      // check title
      if (title != null) {
        if (show.title.includes(title)) {
          titleMatch = true
        } else {
          titleMatch = false
        }
      } else {
        titleMatch = true
      }
      // check streaming
      if (streaming != null && streaming.length !== 0) {
        if (streaming.includes(show.streaming)) {
          streamMatch = true
        } else {
          streamMatch = false
        }
      } else {
        streamMatch = true
      }
      // check seasons
      if (season != null) {
        if (season === show.seasons) {
          seasonMatch = true
        } else {
          seasonMatch = false
        }
      } else {
        seasonMatch = true
      }
       // check complete
       if (complete != null && complete.length !== 0) {
        if (complete.includes(show.complete)) {
          completeMatch = true
        } else {
          completeMatch = false
        }
      } else {
        completeMatch = true
      }
      // check genres
      if (show.genres != null) {
        if (genres.every(elem => show.genres.includes(elem))) {
          genreMatch = true
        } else {
          genreMatch = false
        }
      }
      // add matching show to array
      if (titleMatch && streamMatch && seasonMatch && completeMatch && genreMatch) {
        updatedShows.push(show)
      }
      return updatedShows
    })
    this.setState({shownShows: updatedShows})
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1>List of All Shows:</h1>
            </div>
        </div>
        <div className="row">
          <div className="col">
            <label>
              Title
              <input 
                type="text"
                value={this.state.chosenTitle}
                onChange={this.handleTitleChange} 
                className="form-control" 
                aria-label="Default" 
                aria-describedby="inputGroup-sizing-default"/>
            </label>
          </div>
          <div className="col">
            <label>
              Genres
              <Select
                options={this.state.genres} 
                isMulti
                displayValue="label" 
                onChange={this.handleSelectedGenres} 
              />
            </label>
          </div>
          <div className="col">
            <label>
              Streaming
              <Select
                options={this.state.streaming} 
                isMulti
                displayValue='label'
                onChange={this.handleSelectedStreaming} 
              />
            </label>
          </div>
          <div className="col">
            <label>
              Seasons
              <input
                type="number"
                className="form-control"
                onChange={this.handleSelectedSeason} 
              />
            </label>
          </div>
          <div className="col">
            <label>
              Complete
              <Select
                options={this.state.complete}
                displayValue="label"
                onChange={this.handleSelectedComplete} 
              />
            </label>
          </div>
          <div className="col text-center my-auto">
            <Button 
              variant="primary"
              onClick={this.showModal}
            >
            Add Show
            </Button>
            <Modal show={this.state.showModal} onHide={this.hideModal}>
              <AddShowModal hideFunction={this.hideModal}/>
            </Modal>
          </div>
        </div>  
        <br/>  
        <div className="row">
          <div className="col">
            <div className="card-deck">
              {this.state.shownShows.map(show => 
                <div key={show.id}>
                  <ShowCard title={show.title} genres={show.genres} seasons={show.seasons} complete={show.complete} streaming={show.streaming} id={show.id}/> 
                  <br/>
                </div>
              )}
            </div>
          </div>
        </div>
        <br/>
      </div>
    );
  }
}

export default Shows;