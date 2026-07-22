import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { errorBoxVariants } from '../../config/varitans';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const MessengerError = () => {
    const { error } = useSelector(store => store.firestoreStore);
    return (
        <MessengerErrorContainer {...framerMotionAttributes(errorBoxVariants)}>
            <h2>Looks like there's a problem</h2>
            <p>{error}</p>
        </MessengerErrorContainer>
    );
};

const MessengerErrorContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;

    h2 {
        margin: 1rem;
        color: var(--red);
        letter-spacing: -1px;
        white-space: nowrap;
    }

    p {
        max-width: 30rem;
        font-size: 1em;
        font-weight: 300;
        line-height: 1.5;
    }

    @media (max-width: 500px) {
        p {
            font-size: .6rem;
            max-width: 15rem;
        }
    }
`;

export default MessengerError;