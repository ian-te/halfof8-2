import React from "react";
import styled from "styled-components";
import { useReducerContext } from "../../reducers/root";
import { getTrackById, nextTrackSelector } from "../../reducers/Player";
import { Progress } from "./Progress";
import { lighten } from "polished";

export const Player = () => {
  const { state, dispatch } = useReducerContext();

  const {
    player: { isPlaying, currentItem, tracks, currentTime, duration },
  } = state;
  const nextTrackId = nextTrackSelector(state.player);
  const currentTrack = getTrackById(state.player, currentItem);
  const nextTrack = getTrackById(state.player, nextTrackId);
  if (!isPlaying) return null;
  return (
    <Wrapper>
      <button onClick={() => dispatch({ type: "PREV_TRACK" })}>PREV</button>
      <button onClick={() => dispatch({ type: "STOP_PLAYBACK" })}>STOP</button>
      <PlayerUI>{currentTrack.name}</PlayerUI>
      <Progress progress={currentTime / duration} />
      <PlayerUI>{nextTrack.name}</PlayerUI>
      <button onClick={() => dispatch({ type: "NEXT_TRACK" })}>NEXT</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: player;
  display: flex;
  align-items: center;
  font-size: 12px;
  button {
    border-radius: 24px;
    width: 24px;
    height: 24px;
    font-size: 0;
    border: none;
    background-color: ${(props) => lighten(0.5, props.theme.textColor)};
    margin-right: 8px;
  }
`;

const PlayerUI = styled.div`
  &:not(:last-child) {
    margin-right: 8px;
  }
`;
