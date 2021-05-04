import React, { useRef, useCallback, useEffect, useState } from "react";
import { Play as PlayBase, Pause as PauseBase } from "./components/Play";
import styled from "styled-components";
import { ContentImage } from "../Image";
import { useReducerContext } from "../../../reducers/root";

function readableDuration(seconds) {
  let sec = Math.floor(seconds);
  let min = Math.floor(sec / 60);
  min = min >= 10 ? min : "0" + min;
  sec = Math.floor(sec % 60);
  sec = sec >= 10 ? sec : "0" + sec;
  return min + ":" + sec;
}

export const Audio = ({ name, id, mp3, background, waveformImage }) => {
  const player = useRef();
  console.log('waveformImage ', waveformImage.file.url );
  const [time, setTime] = useState({ currentTime: 0, duration: 0 });

  const {
    state: {
      player: { isPlaying, currentItem },
    },
    dispatch,
  } = useReducerContext();

  useEffect(() => {
    if (isPlaying && currentItem === id) {
    } else if (isPlaying && currentItem !== id) {
      player.current.pause();
      player.current.currentTime = 0;
    } else {
      player.current.pause();
    }
    return () => {};
  }, [isPlaying, currentItem]);

  useEffect(() => {
    player.current.addEventListener("timeupdate", (e) => {
      setTime({
        currentTime: e.target.currentTime,
        duration: e.target.duration,
      });
    });
    return () => {
      player.current.remove();
    };
  }, [mp3]);

  const seek = (e) => {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    player.current.currentTime = (x / rect.width) * time.duration;
  };

  const playpause = useCallback(
    (e) => {
      e.stopPropagation();
      if (currentItem === id && isPlaying) {
        dispatch({ type: "STOP_PLAYBACK" });
      } else {
        dispatch({ type: "START_PLAYBACK", data: { currentItem: id } });
        player.current.play();
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
        <audio style={{ display: "none" }} controls ref={player}>
          <source src={mp3.file.url} type="audio/mpeg" />
        </audio>
        <ControlsWrapper>
          <Button onClick={playpause}>
            {currentItem === id && isPlaying ? <Pause /> : <Play />}
          </Button>
          <ArtistTitle>
            Half of Eight
          </ArtistTitle>
          <TrackName>
            {name}
          </TrackName>
          <WaveForm>
          <img src={waveformImage.file.url} width="100%"/>    
          </WaveForm>
          <TimeWrapper>
            <CurrentTime>{readableDuration(time.currentTime)} </CurrentTime>
            <Duration>{readableDuration(time.duration)}</Duration>
          </TimeWrapper>
          {isPlaying && currentItem === id && (
            <Progress onClick={seek}>
              <Bar
                style={{
                  width: `${100 - (time.currentTime / time.duration) * 100}%`,
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
  ${'' /* path {fill: black}; */}
  ${'' /* background-color: black; */}
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

const Play = styled(PlayBase)`
`;

const Pause = styled(PauseBase)`
`;

const Button = styled.button`
  background: rgba(255, 255, 255, 0.5);
  border: none;
  padding: 0;
  ${'' /* padding: 28px; */}
  outline: none;
  width: 44px;
  height: 44px;
  cursor: pointer;
  position: relative;
  z-index: 10;
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
  top: 22px;
  left: 44px;
  color: #000;
  padding-left: 4px;
  padding-right: 4px;
  height: 22px;
  line-height: 22px;
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
  top: 0;
  left: 44px;
  height: 22px;
  color: #000;
  line-height: 22px;
  padding-left: 4px;
  padding-right: 4px;
  background: #FFFFFF;

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
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  border-radius: 0px;
  padding: 0px 2px;
`;

const CurrentTime = styled(Time)`
  background-color: white;
  color: #0c0c0d;
`;
const Duration = styled(Time)`
  color: white;
  background-color: #0c0c0d;
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
