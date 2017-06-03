import React, { Component } from "react";
import styled from "styled-components";
import { Motion, StaggeredMotion, spring, presets } from "react-motion";
import Times from "react-icons/lib/fa/times-circle-o";
import { range } from "lodash";

import EpisodeList from "./EpisodeList";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 400px;
`;

const SideBar = styled.div`
  position: absolute;
  background: #eee;
  padding: 30px;
  left: 0;
`;

const SidebarClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #999;
  transition: all 0.3s ease;
  cursor: pointer;
  font-size: 30px;
  opacity: ${props => (props.show ? 1 : 0)};

  &:hover {
    color: #000;
  }

  &:active, &:focus {
    outline: none;
    border: none;
  }
`;

const springSettings = {
  stiffness: 400,
  damping: 40
};

const PodcastImage = styled.img`
  max-width: 100%;
  bottom: 0;
  width: 100%;
  left: 0;
  position: absolute;
`;

const PodcastDescription = ({ title, description }) => {
  return (
    <div>
      <StaggeredMotion
        defaultStyles={range(0, 2).map(x => ({ y: 20, o: 0 }))}
        styles={prevInterpolatedStyles =>
          prevInterpolatedStyles.map((_, i) => {
            return i === 0
              ? { y: spring(0, springSettings), o: spring(1) }
              : {
                  y: spring(prevInterpolatedStyles[i - 1].y, springSettings),
                  o: spring(prevInterpolatedStyles[i - 1].o)
                };
          })}
      >
        {interpolatingStyles =>
          <div>
            {interpolatingStyles.map((style, i) => {
              const s = {
                transform: `translate3d(0, ${style.y}px, 0)`,
                opacity: style.o
              };
              if (i === 0) {
                return <h1 key={i} style={s}>{title}</h1>;
              } else {
                return <p key={i} style={s}>{description}</p>;
              }
            })}

          </div>}
      </StaggeredMotion>
    </div>
  );
};

class PodcastInfo extends Component {
  state = {
    animated: false,
    showInfo: false,
    containerHeight: 0
  };

  selectEpisode = episode => {
    this.props.onSelectEpisode(episode);
  };

  close = () => {
    this.props.onClose();
  };

  componentDidMount() {
    this.setState({
      containerHeight: this.container.clientHeight
    });
    setTimeout(() => this.setState({ animated: true }), 300);
    setTimeout(() => this.setState({ showInfo: true }), 550);
  }

  render() {
    const { startX, startY, podcast, onSelectEpisode } = this.props;
    const { animated, containerHeight, showInfo } = this.state;

    return (
      <Motion
        defaultStyle={{
          x: startX,
          y: startY,
          w: 150,
          h: 150,
          o: 0
        }}
        style={{
          x: spring(animated ? 0 : startX, springSettings),
          y: spring(animated ? 0 : startY, springSettings),
          w: spring(animated ? 400 : 150, springSettings),
          h: spring(animated ? containerHeight : 150, springSettings),
          o: spring(1)
        }}
      >
        {styles =>
          <Container
            innerRef={elem => (this.container = elem)}
            style={{ backgroundColor: `rgba(30,30,30, ${styles.o})` }}
          >
            <SideBar
              style={{
                transform: `translate3d(${styles.x}px, ${styles.y}px, 0)`,
                width: styles.w + "px",
                height: styles.h + "px",
                opacity: styles.o
              }}
            >
              <SidebarClose onClick={this.close} show={showInfo}>
                <Times />
              </SidebarClose>
              {showInfo &&
                <PodcastDescription
                  title={podcast.title}
                  description={podcast.description.long}
                />}
              {showInfo &&
                <Motion defaultStyle={{ y: 100 }} style={{ y: spring(0) }}>
                  {styles =>
                    <PodcastImage
                      style={{ transform: `translate3d(0, ${styles.y}%, 0)` }}
                      src={podcast.image}
                    />}
                </Motion>}
            </SideBar>
            <EpisodeList
              episodes={podcast.episodes}
              show={showInfo}
              onSelect={onSelectEpisode}
            />
          </Container>}
      </Motion>
    );
  }
}

export default PodcastInfo;
