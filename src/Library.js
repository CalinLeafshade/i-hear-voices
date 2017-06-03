import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 15px;
`;

const PodcastContainer = styled.div`
  max-width: 150px;
  max-height: 150px;
  padding: 5px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: 0.3s all ease;

  &:hover {
    border-color: ${props => props.theme.lightGrey};
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

class PodcastThumb extends Component {
  handleClick = () => {
    const rect = this.elem.getBoundingClientRect();
    this.props.onClick(rect.left, rect.top);
  };

  render() {
    const { image, title } = this.props;
    return (
      <PodcastContainer
        title={title}
        onClick={this.handleClick}
        innerRef={elem => (this.elem = elem)}
      >
        <img src={image} />
      </PodcastContainer>
    );
  }
}

class Library extends Component {
  render() {
    const { podcasts, onSelect } = this.props;
    return (
      <Container>
        {podcasts.map((p, i) =>
          <PodcastThumb
            key={i}
            onClick={(x, y) => onSelect(p, x, y)}
            image={p.image}
          />
        )}
      </Container>
    );
  }
}

export default Library;
