import React from "react";
import styled from "styled-components";
import { useReducerContext } from "../../reducers/root";

export const Tag = ({ name, identifier, onClick }) => {
  const { state, dispatch } = useReducerContext();
  const {
    filter: { tag },
  } = state;
  const onTagClick = (e) => {
    e.preventDefault();
    onClick && onClick(identifier);
    dispatch({ type: "FILTER_BY_TAG", payload: { tag: identifier } });
  };
  const isActive = tag === identifier;
  return (
    <Wrapper href={`/tag/${name}`} onClick={onTagClick} active={isActive}>
      {name}
    </Wrapper>
  );
};

const Wrapper = styled.a`
  text-decoration: none !important;
  border: 1px solid ${(props) => props.theme.headerTextColor};
  border-bottom: 1px solid ${(props) => props.theme.headerTextColor}!important;

  ${'' /* background-color:  ${(props) => props.theme.bgColor}; */}
  background-color: ${(props) => props.active && props.theme.bodyColor};
  
  color: ${(props) =>
    props.active ? props.theme.headerTextColor : props.theme.headerTextColor}!important;

  cursor: pointer;

  @media (min-width: 320px) {
    font-size: 7.5vw;
    padding: 4px 16px;
    border-radius: 32px;
    line-height: 1;
  }

  @media (min-width: 640px) {
    font-size: 2vw;
    padding: 4px 8px;
    border-radius: 40px;
  }


  @media (min-width: 1024px) {
    font-size: 2vw;
    padding: 8px 16px;
    border-radius: 40px;
  }


  &:hover {
    border: 1px solid ${(props) => props.theme.headerTextColor};
    border-bottom: 1px solid ${(props) => props.theme.headerTextColor}!important;

    background-color: ${(props) => props.theme.bodyColor};;
    color: ${(props) => props.theme.headerTextColor}!important;

    transition: 0.5s ease;
  }
`;
