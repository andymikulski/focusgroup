import React from 'react';
import InlineCss from 'react-inline-css';

import { connect } from 'react-redux';

import { api, SUCCESS } from '../config.js';
import Header from 'components/Header';
import Footer from 'components/Footer';

/**
* FocusGroupPage React application entry-point for both the server and client.
*/
@connect(
  state => ({
    router: state.router
  }), {})
export default class FocusGroupPage extends React.Component {

  static contextTypes = {};
  static defaultProps = {};
  state = {
    isLoading: true,
    isSubmittingTest: false,
    playlist: [],
    shows: [],
    editingPlaylist: [],
    editingScore: null,
    samples: 0
  };

  componentWillMount() {}

  componentDidMount() {
    this.getShowsUsed();
    this.getTestPlaylist();
  }

  render() {
    return (
      <InlineCss stylesheet={ this.css() } namespace="FocusGroupPage">
        <Header />
          <form className="container" onSubmit={ ::this.handleVote }>
            <h2>Welcome to the focus group!</h2>
            <p>Here you'll be presented with some playlists, and you'll be asked to rate them using the provided slider. Later, your preferences will weigh in on creating the BEST playlist possible!</p>
            { this.state.isLoading ? `Loading new playlist..` : `` }

            <ol>
              { (this.state.playlist || []).map((playlistItem, index)=>{
                return (<li className="test-playlist-item" key={ index }>{ this.state.shows[playlistItem] }</li>);
              })
              }
            </ol>
            <br />
            { this.state.isLoading ? `` : (<div style={{ textAlign: `center`, marginLeft: `12px` }}>Bad &lt;--&gt; Good</div>) }
            { this.state.isLoading ? `` : (<input className="range-slider" type="range" min="0" max="1" step="0.01" defaultValue="0.5" ref="voteslider" />) }
            <br />
            { this.state.isLoading ? `` : (<button className="submit-button" type="submit" onClick={ ::this.handleVote }>Vote</button>) }
          </form>
        <Footer />
      </InlineCss>
    );
  }

  css() {
    return (`
      & .test-playlist-item {
        margin-bottom: 0.5em;
      }
      & .range-slider {
        width: 100%;
      }
      & .submit-button {
        font-size: 16px;
      }
    `);
  }

  getShowsUsed() {
    fetch(`${ api }/noggin/`)
    .then((response) => response.json())
    .then((response) => {
      if (response.shows) {
        this.setState({
          shows: response.shows
        });
      }
    });
  }

  getTestPlaylist() {
    this.setState({
      isLoading: true,
      playlist: []
    });

    fetch(`${ api }/noggin/test`)
    .then((response) => response.json())
    .then((response) => {
      if (response.playlist) {
        this.setState({
          isLoading: false,
          playlist: response.playlist
        });
      }
    });
  }

  removeItem(index) {
    let newPlaylist;
    newPlaylist = this.state.editingPlaylist;
    newPlaylist.splice(index, 1);

    this.setState({
      editingPlaylist: newPlaylist
    });
  }

  addQueue(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }

    const selectedShow = this.refs.showlist.value;

    let newPlaylist;
    newPlaylist = this.state.editingPlaylist;
    newPlaylist.push(selectedShow);

    this.setState({
      editingPlaylist: newPlaylist,
      editingScore: null
    });
  }

  resetQueue(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }

    this.setState({
      editingPlaylist: [],
      editingScore: null
    });
  }

  handleVote(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }
    this.setState({
      isLoading: true
    });

    const score = this.refs.voteslider.value;
    const playlist = this.state.playlist;

    fetch(`${ api }/noggin/test`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playlist,
        score
      })
    })
    .then((response) => response.json())
    .then((response) => {
      if (response.status === SUCCESS) {
        this.getTestPlaylist();

        if (this.props.hasOwnProperty('onSuccess')) {
          this.props.onSuccess(response);
        }
      } else {
        this.setState({
          errorMessage: response.message
        });

        if (this.props.hasOwnProperty('onError')) {
          this.props.onError(response);
        }
      }
    });
  }

  handleTestPlaylist(event) {
    if (event.preventDefault) {
      event.preventDefault();
    }

    this.setState({
      editingScore: null,
      samples: 0,
      isSubmittingTest: true
    });

    const playlist = this.state.editingPlaylist;

    fetch(`${ api }/noggin`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playlist
      })
    })
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        isSubmittingTest: false,
        editingScore: (response.score * 100).toFixed(2),
        samples: response.sample
      });
    });
  }
}
