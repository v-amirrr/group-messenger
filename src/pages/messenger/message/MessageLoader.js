import React, { memo } from 'react';
import Check from '../../../common/Check';
import DotsLoader from '../../../common/DotsLoader';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

const MessageLoader = ({ status }) => {
    return (
        <>
            <MessageLoaderContainer>
                <AnimatePresence exitBeforeEnter>
                    {
                        status == 1 ? <DotsLoader key='loader' scale={1.1} /> :
                        status == 2 ? <Check key='check' scale={1.2} /> : ''
                    }
                </AnimatePresence>
            </MessageLoaderContainer>
        </>
    );
};

const MessageLoaderContainer = styled.div`
    margin: 0 .3rem;
`;

export default memo(MessageLoader);
