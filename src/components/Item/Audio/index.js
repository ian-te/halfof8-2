import React, { useRef, useCallback, useEffect, useMemo } from "react";
import { Play as PlayBase, Pause as PauseBase } from "./components/Play";
import styled from "styled-components";
import { ContentImage } from "../Image";
import { useReducerContext } from "../../../reducers/root";
import { readableDuration } from "../../../helpers/readableDuration";
import { getSrc } from "gatsby-plugin-image";

export const Audio = ({ name, id, mp3, background, waveformImage }) => {
  const player = useRef();

  const {
    state: {
      player: { isPlaying, currentItem, currentTime, duration },
    },
    dispatch,
  } = useReducerContext();

  useEffect(() => {
    dispatch({
      type: "ADD_TRACK",
      data: {
        id,
        name,
        file: mp3.file.url,
        duration,
        art: getSrc(background.albumArt),
      },
    });
  }, []);

  const seek = (e) => {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    dispatch({
      type: "SEEK_TIME",
      data: { seekTime: (x / rect.width) * duration },
    });
  };

  const isCurrentPlaying = useMemo(
    () => isPlaying && currentItem === id,
    [id, currentItem, isPlaying]
  );

  const playpause = useCallback(
    (e) => {
      if (!!e) e.stopPropagation();
      if (currentItem === id && isPlaying) {
        dispatch({ type: "STOP_PLAYBACK" });
      } else {
        dispatch({ type: "START_PLAYBACK", data: { currentItem: id } });
      }
    },
    [isPlaying, currentItem]
  );

  return (
    <div style={{ height: "100%" }}>
      <Background>
        <ContentImage
          item={{ indexBackgroundImage: background, ratio: 0.75 }}
        />
      </Background>
      <Wrapper>
        <ControlsWrapper>
          <Button onClick={playpause}>
            {currentItem === id && isPlaying ? <Pause /> : <Play />}
          </Button>
          <ArtistTitle>Half of Eight</ArtistTitle>
          <TrackName>{name}</TrackName>
          {waveformImage && (
            <WaveForm>
              <img src={waveformImage.file.url} width="100%" />
            </WaveForm>
          )}
          {isCurrentPlaying && (
            <TimeWrapper>
              <CurrentTime>{readableDuration(currentTime)} </CurrentTime>
              <Duration>{readableDuration(duration)}</Duration>
            </TimeWrapper>
          )}
          {isCurrentPlaying && (
            <Progress onClick={seek}>
              <Bar
                style={{
                  width: `${100 - (currentTime / duration) * 100}%`,
                }}
              />
            </Progress>
          )}
        </ControlsWrapper>
      </Wrapper>
    </div>
  );
};

const Background = styled.div`
  position: absolute;
  width: 101%;
  height: 101%;
`;

const WaveForm = styled.div`
  position: absolute;
  left: 8px;
  width: calc(100% - 16px);
  bottom: 36px;
  ${"" /* path {fill: black}; */}
  ${"" /* background-color: black; */}
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 0;
  pointer-events: none;
`;

const Play = styled(PlayBase)``;

const Pause = styled(PauseBase)``;

const Button = styled.button`
  background: white;
  border: none;
  top: 8px;
  left: 8px;
  padding-top: 2px;
  ${"" /* padding: 28px; */}
  outline: none;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  cursor: pointer;
  position: relative;
  z-index: 10;

  &:hover {
    background: black;
    svg path {
      fill: white !important;
      transition: 0.5s ease;
    }
  }

  &:active {
    ${Play} > path, ${Pause} > path {
      fill: black;
    }
  }
`;

const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const TrackName = styled.div`
  position: absolute;
  top: 30px;
  left: 58px;
  color: #000;
  padding-left: 4px;
  padding-right: 4px;
  height: 22px;
  line-height: 22px;
  ${"" /* border-radius: 11px; */}
  background: rgba(255, 255, 255, 0.8);

  @media (min-width: 360px) {
    font-size: 10px;
  }
  @media (min-width: 640px) {
    font-size: 10px;
  }
  @media (min-width: 1024px) {
    font-size: 12px;
  }
  @media (min-width: 1440px) {
    font-size: 14px;
  }
  @media (min-width: 1920px) {
    font-size: 14px;
  }
`;

const ArtistTitle = styled.div`
  position: absolute;
  top: 8px;
  left: 58px;
  height: 22px;
  color: #000;
  line-height: 22px;
  padding-left: 4px;
  padding-right: 4px;
  background: #ffffff;
  ${"" /* border-radius: 11px; */}

  @media (min-width: 360px) {
    font-size: 10px;
  }
  @media (min-width: 640px) {
    font-size: 10px;
  }
  @media (min-width: 1024px) {
    font-size: 12px;
  }
  @media (min-width: 1440px) {
    font-size: 14px;
  }
  @media (min-width: 1920px) {
    font-size: 14px;
  }
`;

const Wrapper = styled.div`
  height: 100%;
`;

const ControlsWrapper = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  justify-content: space-between;
  z-index: 10;
`;

const Time = styled.span`
  position: absolute;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  border-radius: 12px;
  bottom: 8px;
  padding: 0px 4px;
`;

const CurrentTime = styled(Time)`
  background-color: white;
  color: #0c0c0d;
  left: 8px;
`;
const Duration = styled(Time)`
  color: white;
  background-color: #0c0c0d;
  right: 8px;
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
