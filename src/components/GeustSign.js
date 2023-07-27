import React from 'react';
import guestIcon from '../assets/images/guest-mode2.png';
import styled from 'styled-components';

const GeustSign = () => {
    return (
        <>
            <GuestSignContainer>
                <img src={guestIcon} />
                <p>Guest Mode</p>
            </GuestSignContainer>
        </>
    );
};

const GuestSignContainer = styled.div`
    position: absolute;
    top: 1.1rem;
    left: 2rem;
    border: var(--border-first);
    border-radius: var(--radius-third);
    backdrop-filter: var(--glass-first);
    -webkit-backdrop-filter: var(--glass-first);
    width: 7.5rem;
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    z-index: 99;
    box-shadow: var(--shadow-first);

    p {
        white-space: nowrap;
        font-size: 0.8rem;
        font-weight: var(--text-boldness-third);
        position: absolute;
        left: 2.3rem;
    }

    img {
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        left: 0.5rem;
    }
`;

export default GeustSign;
