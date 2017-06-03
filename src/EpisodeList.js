import React, { Component } from "react";
import styled from "styled-components";
import { Motion, StaggeredMotion, spring, presets } from "react-motion";
import moment from "moment";

const Container = styled.div`
  width: 100%;
  height: 100%;
  transition: all 0.4s ease;
  overflow-y: scroll;
  will-change: transform;
`;

const PublishDate = styled.p`
  margin: 0;
  font-size: 12px;
  color: #333;
  transition: all 0.3s ease;
`;

const EpisodeListItem = styled.div`
  width: 100%;
  height: 80px;
  background: white;
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  box-shadow: 0 2px 2px rgba(0,0,0,0.3);
  padding: 15px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #333;
    color: white;

    ${PublishDate} {
      color: white;
    }
  }
`;

const EpisodeTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 5px;
`;

const springSettings = {
  stiffness: 400,
  damping: 40
};

class EpisodeList extends React.PureComponent {
  render() {
    const { episodes, onSelect, show } = this.props;
    return (
      <Container
        style={{
          opacity: show ? 1 : 0,
          transform: `translateX(${show ? 0 : 50}px)`
        }}
      >
        {episodes.map((episode, i) =>
          <EpisodeListItem key={i} onClick={() => onSelect(episode)}>
            <EpisodeTitle>{episode.title}</EpisodeTitle>
            <PublishDate>
              {moment(episode.published).calendar()}
            </PublishDate>
          </EpisodeListItem>
        )}
      </Container>
    );
  }
}

// const EpisodeList = ({ episodes, onSelect }) =>
//   <Container>
//     <StaggeredMotion
//       defaultStyles={episodes.map(x => ({
//         y: 50,
//         o: 0
//       }))}
//       styles={prevInterpolatedStyles =>
//         prevInterpolatedStyles.map((_, i) => {
//           return i === 0
//             ? { y: spring(0, springSettings), o: spring(1, springSettings) }
//             : {
//                 y: spring(prevInterpolatedStyles[i - 1].y, springSettings),
//                 o: spring(prevInterpolatedStyles[i - 1].o, springSettings)
//               };
//         })}
//     >
//       {interpolatingStyles =>
//         <div style={{ height: "100%", overflowY: "scroll" }}>
//           {interpolatingStyles.map((style, i) => {
//             const s = {
//               //transform: `translate3d(${style.y}px,0, 0)`,
//               //opacity: style.o
//             };
//             const episode = episodes[i];
//             return (
//               <EpisodeListItem
//                 key={i}
//                 style={s}
//                 onClick={() => this.selectEpisode(episode)}
//               >
//                 <EpisodeTitle>{episode.title}</EpisodeTitle>
//                 <PublishDate>
//                   {moment(episode.published).toString()}
//                 </PublishDate>
//               </EpisodeListItem>
//             );
//           })}
//
//         </div>}
//     </StaggeredMotion>
//   </Container>;

export default EpisodeList;
