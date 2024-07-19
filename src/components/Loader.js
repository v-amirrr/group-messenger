import React from 'react';
import { useSelector } from 'react-redux';
import DotsLoader from './common/DotsLoader';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { loaderVariants } from '../config/varitans';

const Loader = () => {
    const { loader } = useSelector(store => store.appStore);
    return (
        <>
            <AnimatePresence exitBeforeEnter>
            {
                loader ?
                <LoaderContainer key='loader' initial='hidden' animate='visible' exit='exit' variants={loaderVariants}>
                    <DotsLoader scale={1.5} />
                </LoaderContainer>
                : ''
            }
            </AnimatePresence>
        </>
    );
};

const LoaderContainer = styled(motion.div)`
    position: absolute;
    width: 100vw;
    height: 100dvh;
    z-index: 6;
    background-color: #00000088;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: var(--glass);
`;

export default Loader;