import React from 'react';
import styled from 'styled-components'

const MobileHide = styled.div`
    display: block;
    @media (max-width: 560px) {
        display: none;
    }
`
const MobileShow = styled.div`
    display: none;
    @media (max-width: 560px) {
        display: block;
    }
`
export {
    MobileShow,
    MobileHide
}