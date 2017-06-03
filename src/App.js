import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Motion, spring } from "react-motion";

import AudioPlayer from "./AudioPlayer";
import Library from "./Library";
import PodcastInfo from "./PodcastInfo";

import { togglePlay, setPodcasts, playEpisode } from "./actions";
import * as types from "./actions/types";
import { getPodcasts } from "./repos/library";

const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: ${props => props.theme.darkGrey};
  flex-flow: column;
`;

const TopBar = styled.div`
  //border-bottom: 1px solid ${props => props.theme.lightGrey};
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
  height: 60px;
`;

const LibraryContainer = styled.div`
  position: relative;
  flex: 1;
`;

class App extends Component {
  state = {
    show: null,
    x: 0,
    y: 0
  };

  handlePlayToggle = () => {
    this.props.dispatch(togglePlay());
  };

  handleEpisodeSelect = episode => {
    this.props.dispatch(playEpisode(episode));
  };

  handlePodcastSelect = (which, x, y) => {
    this.setState({
      show: which,
      x: x,
      y: y,
      fade: false,
      over: true
    });

    setTimeout(() => {
      this.setState({
        fade: true
      });
    }, 0);

    setTimeout(() => {
      this.setState({
        over: false
      });
    }, 600);
  };

  closeEpisode = () => {
    this.setState({
      show: null
    });
  };

  componentDidMount() {
    getPodcasts().then(casts => this.props.dispatch(setPodcasts(casts)));
  }

  render() {
    const { playStatus, podcasts, episode } = this.props;
    const { show, x, y, over, windowHeight, fade } = this.state;
    return (
      <Container>
        <TopBar>
          <AudioPlayer
            episode={episode}
            onPlayToggle={this.handlePlayToggle}
            status={playStatus}
          />
        </TopBar>
        <LibraryContainer>
          <Library podcasts={podcasts} onSelect={this.handlePodcastSelect} />
          {show &&
            <PodcastInfo
              startX={x}
              startY={y - 60}
              podcast={show}
              onSelectEpisode={this.handleEpisodeSelect}
              onClose={this.closeEpisode}
            />}
        </LibraryContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  playStatus: state.player.playStatus,
  podcasts: state.podcasts.podcasts,
  episode: state.player.episode
});

export default connect(mapStateToProps)(App);
