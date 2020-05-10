import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo
} from "react";
import { Play as PlayBase, Pause as PauseBase } from "./components/Play";
import styled from "styled-components";
import { ContentImage } from "../Image";
import { PlayerContext } from "../../../reducers/Player";

function readableDuration(seconds) {
  let sec = Math.floor(seconds);
  let min = Math.floor(sec / 60);
  min = min >= 10 ? min : "0" + min;
  sec = Math.floor(sec % 60);
  sec = sec >= 10 ? sec : "0" + sec;
  return min + ":" + sec;
}

export const Audio = ({ id, mp3, background }) => {
  const player = useRef();
  const [time, setTime] = useState({ currentTime: 0, duration: 0 });
  const {
    state: { isPlaying, currentItem },
    dispatch
  } = useContext(PlayerContext);

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
    player.current.addEventListener("timeupdate", e => {
      setTime({
        currentTime: e.target.currentTime,
        duration: e.target.duration
      });
    });
    return () => {
      player.current.remove();
    };
  }, [mp3]);

  const playpause = useCallback(() => {
    if (currentItem === id && isPlaying) {
      dispatch({ type: "STOP_PLAYBACK" });
    } else {
      dispatch({ type: "START_PLAYBACK", data: { currentItem: id } });
      player.current.play();
    }
  }, [isPlaying, currentItem]);

  return (
    <div style={{ height: "100%" }}>
      <Background>
        <ContentImage item={{ indexBackgroundImage: background }} />
      </Background>
      <Wrapper>
        {isPlaying && currentItem === id && (
          <Progress>
            <Bar
              style={{
                width: `${100 - (time.currentTime / time.duration) * 100}%`
              }}
            />
          </Progress>
        )}
        <audio style={{ display: "none" }} controls ref={player}>
          <source src={mp3.file.url} type="audio/mpeg" />
        </audio>
        <ControlsWrapper>
          <Button onClick={playpause}>
            {currentItem === id && isPlaying ? <Pause /> : <Play />}
          </Button>
          <TimeWrapper>
            <CurrentTime>{readableDuration(time.currentTime)} </CurrentTime>
            <Duration>{readableDuration(time.duration)}</Duration>
          </TimeWrapper>
        </ControlsWrapper>
      </Wrapper>
    </div>
  );
};

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 0;
`;

const Play = styled(PlayBase)`
  filter: drop-shadow(0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0590406))
    drop-shadow(0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0848175))
    drop-shadow(0px 12.5216px 10.0172px rgba(0, 0, 0, 0.105))
    drop-shadow(0px 22.3363px 17.869px rgba(0, 0, 0, 0.125183))
    drop-shadow(0px 41.7776px 33.4221px rgba(0, 0, 0, 0.150959))
    drop-shadow(0px 100px 80px rgba(0, 0, 0, 0.21));
`;

const Pause = styled(PauseBase)`
  filter: drop-shadow(0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0590406))
    drop-shadow(0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0848175))
    drop-shadow(0px 12.5216px 10.0172px rgba(0, 0, 0, 0.105))
    drop-shadow(0px 22.3363px 17.869px rgba(0, 0, 0, 0.125183))
    drop-shadow(0px 41.7776px 33.4221px rgba(0, 0, 0, 0.150959))
    drop-shadow(0px 100px 80px rgba(0, 0, 0, 0.21));
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  padding: 28px;
  outline: none;
  width: 32px;
  cursor: pointer;
  &:active {
    ${Play} > path, ${Pause} > path {
      fill: #0029FF;
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

const Wrapper = styled.div`
  height: 100%;
`;
const ControlsWrapper = styled.div`
  padding: 2px;
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
  padding: 1px 3px;
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
