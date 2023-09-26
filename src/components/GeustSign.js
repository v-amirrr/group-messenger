import React from 'react';
import guestIcon from '../assets/images/guest-mode2.png';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { guestSignVariants } from '../config/varitans';

const GeustSign = () => {
    return (
        <>
            <GuestSignContainer initial='hidden' animate='visible' exit='exit' variants={guestSignVariants}>
                <img src={guestIcon} />
                <p>Guest Mode</p>
            </GuestSignContainer>
        </>
    );
};

const GuestSignContainer = styled(motion.div)`
    position: absolute;
    top: 1.1rem;
    left: 2rem;
    border: var(--border-first);
    border-radius: 50px;
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

    @media (max-width: 500px) {
        left: 0;
        width: 8rem;
        height: 3rem;

        p {
            font-size: .9rem;
            left: 2.5rem;
        }

        img {
            width: 1.8rem;
            height: 1.8rem;
        }
    }
`;

export default GeustSign;
