import React, { Component } from "react";
import styled from "styled-components";
import Play from "react-icons/lib/fa/play";
import Pause from "react-icons/lib/fa/pause";
import Backward from "react-icons/lib/fa/backward";
import Forward from "react-icons/lib/fa/forward";

const ControlButton = styled.button`
  background: none;
  color: #ccc;
  border: none;
  height: 40px;
  margin: 0 10px;

  &:hover {
    color: white;
  }
`;
const Container = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

class AudioPlayer extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.status === "playing" && this.player.paused) {
      this.player.play();
    } else if (!this.player.paused) {
      this.player.pause();
    }
  }

  getSrc() {
    const { episode } = this.props;
    return episode && episode.enclosure && episode.enclosure.url;
  }

  render() {
    const { status, duration, progress, onPlayToggle, episode } = this.props;
    return (
      <Container>
        <audio ref={ref => (this.player = ref)} src={this.getSrc()} />
        <ControlButton>
          <Backward />
        </ControlButton>
        <ControlButton onClick={onPlayToggle}>
          {status === "playing" ? <Pause /> : <Play />}
        </ControlButton>
        <ControlButton>
          <Forward />
        </ControlButton>
      </Container>
    );
  }
}

export default AudioPlayer;
