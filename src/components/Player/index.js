import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { useReducerContext } from "../../reducers/root";
import {
  getTrackById,
  nextTrackSelector,
  prevTrackSelector,
} from "../../reducers/Player";
import { Progress } from "./Progress";
import { lighten } from "polished";

export const Player = () => {
  const { state, dispatch } = useReducerContext();

  const {
    player: { isPlaying, currentItem, seekTime, tracks, currentTime, duration },
  } = state;
  const prevTrackId = prevTrackSelector(state.player);
  const nextTrackId = nextTrackSelector(state.player);

  const prevTrack = getTrackById(state.player, prevTrackId);
  const currentTrack = getTrackById(state.player, currentItem);
  const nextTrack = getTrackById(state.player, nextTrackId);
  const player = useRef();
  const source = useRef();

  const setTime = () => {};

  useEffect(() => {
    player.current?.addEventListener("timeupdate", (e) => {
      dispatch({
        type: "UPDATE_TIME",
        data: {
          currentTime: e.target.currentTime,
          duration: e.target.duration,
        },
      });
    });

    player.current?.addEventListener("ended", (e) => {
      console.log(">>> ended", e);
      dispatch({ type: "NEXT_TRACK" });
    });
    return () => {
      // player.current && player.current.remove();
    };
  }, [currentItem]);

  useEffect(() => {
    if (!!currentItem && isPlaying && currentTrack.file) {
      console.log(">>>toggle play");
      if (!player.current?.paused) {
        player.current.pause();
      }
      player.current.load();
      player.current.play();
    }
  }, [currentItem]);

  useEffect(() => {
    if (!currentItem) return null;
    if (!isPlaying) {
      console.log(">>> pausing");
      player.current.pause();
    }
    if (
      isPlaying &&
      player.current?.paused &&
      source.current?.src.includes(currentTrack?.file)
    ) {
      console.log(">>> playing");
      player.current.play();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!player.current) return null;
    player.current.currentTime = seekTime;
  }, [seekTime]);

  if (!currentItem) return null;

  return (
    <Wrapper>
      <audio style={{ display: "none" }} controls ref={player}>
        <source src={currentTrack.file} ref={source} type="audio/mpeg" />
      </audio>
      <button onClick={() => dispatch({ type: "PREV_TRACK" })}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 4H10V12H12V4Z" fill="black" />
          <path d="M8 4L3 8.5L8 12V4Z" fill="black" />
        </svg>
        <p>{prevTrack.name}</p>
      </button>

      <button
        onClick={() =>
          dispatch({ type: "PLAYPAUSE", data: { currentItem: currentItem } })
        }
      >
        {isPlaying ? (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 3H7V13H4V3Z" fill="black" />
            <path d="M9 3H12V13H9V3Z" fill="black" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 4L11 8.5L5 12V4Z" fill="black" />
          </svg>
        )}
        <p>{currentTrack.name}</p>
      </button>
      {/* <PlayerUI>{currentTrack.name}</PlayerUI> */}
      <Progress progress={currentTime / duration} />
      <button onClick={() => dispatch({ type: "NEXT_TRACK" })}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4 4H6V12H4V4Z" fill="black" />
          <path d="M8 4L13 8.5L8 12V4Z" fill="black" />
        </svg>
        <p>{nextTrack.name}</p>
      </button>
      <button onClick={() => dispatch({ type: "STOP_PLAYBACK" })}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.99902 5.14303L5.14206 4L12.0003 10.8582L10.8572 12.0012L3.99902 5.14303Z"
            fill="black"
          />
          <path
            d="M10.8573 4.00012L12.0003 5.14315L5.14211 12.0014L3.99908 10.8583L10.8573 4.00012Z"
            fill="black"
          />
        </svg>
      </button>
      {/* <PlayerUI>{nextTrack.name}</PlayerUI> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: sticky;
  padding: 8px;
  margin-top: 16px;
  bottom: 8px;
  ${"" /* grid-area: player; */}
  display: flex;
  flex-wrap: wrap;
  grid-row-gap: 8px;
  align-items: center;
  font-size: 12px;

  button {
    border-radius: 24px;
    ${"" /* width: 24px; */}
    height: 24px;
    font-size: 12px;
    line-height: 16px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    border: 1px solid black;
    ${
      "" /* background-color: ${(props) => lighten(0.5, props.theme.textColor)}; */
    }
    background-color: ${(props) => props.theme.bodyColor};

    &:not(:last-child) {
      margin-right: 8px;
    }

    padding: 4px;
    cursor: pointer;

    p {
      color: ${(props) => props.theme.textColor} !important;
      margin-right: 4px;
      margin-left: 4px;
      filter: none;
    }

    svg {
      width: 16px;
      height: 16px;
    }

    svg path {
      fill: ${(props) => props.theme.textColor};
    }

    &:hover {
      p {
        color: ${(props) => props.theme.bgColor} !important;
      }
      background-color: ${(props) => props.theme.textColor};
      svg path {
        fill: ${(props) => props.theme.bgColor} !important;
      }
      transition: 0.5s ease;
    }
  }
`;

const PlayerUI = styled.div``;
