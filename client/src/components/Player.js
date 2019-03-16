import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import Spinner from "./Spinner";
import PlayerBar from "./PlayerBar";
require("dotenv").config();

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // parameters for the search that can be changed by the user
      videoDuration: "any", //short / medium / long / any
      videoId: false,
      relevanceLanguage: "de",
      isloading: true
    };
  }

  // componentWillReceiveProps(newProps) ComponentDidUpdate better!

  componentDidMount(props) {
    axios
      .get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          part: "snippet", //by default
          q: this.props.keyword,
          videoDuration: this.state.videoDuration,
          maxResults: "50",
          videoEmbeddable: true, // search to only videos that can be embedded into a webpage
          type: "video", //required by parameter "videoEmbeddable"
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
          loading: true
        }
      })

      .then(res => {
        const randomVideo = Math.floor(Math.random() * 51);

        this.setState({ videoId: res.data.items[randomVideo].id.videoId });
        this.setState({ isloading: false });
      });
  }

  randomizeVideos = () => {
    axios
      .get(`https://www.googleapis.com/youtube/v3/search`, {
        params: {
          //these parameters are definded by us, can't be changed by the user
          part: "snippet", //by default
          q: this.props.keyword,
          videoDuration: this.state.videoDuration,
          maxResults: "50",
          videoEmbeddable: true, // search to only videos that can be embedded into a webpage
          type: "video", //required by parameter "videoEmbeddable"
          key: process.env.REACT_APP_YOUTUBE_API_KEY
          // channelId: 'UCqmQ1b96-PNH4coqgHTuTlA',
        }
      })
      .then(res => {
        const randomVideo = Math.floor(Math.random() * 51);
        this.setState({ videoId: res.data.items[randomVideo].id.videoId });
        this.setState({ isloading: false });
      });
  };

  render() {
    const src = `https://www.youtube.com/embed/${
      this.state.videoId
    }?modestbranding=1&color=white`;

    return (
      <div>
        {this.state.isloading === true && <Spinner />}
        <div className="wrapperVideo">
          <div class="video-player">
            {this.state.videoId && (
              <iframe title="Video-Player" src={src} allowFullScreen />
            )}
            <PlayerBar
              videoID={this.state.videoId}
              randomVideo={this.randomizeVideos}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
