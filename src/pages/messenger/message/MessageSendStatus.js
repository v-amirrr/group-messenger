import React, { memo } from 'react';
import Check from '../../../common/Check';
import DotsLoader from '../../../common/DotsLoader';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

const MessageSendStatus = ({ status }) => {
    return (
        <>
            <MessageSendStatusContainer>
                <AnimatePresence exitBeforeEnter>
                    {
                        status == 1 ? <DotsLoader key='loader' scale={1.1} /> :
                        status == 2 ? <Check key='check' scale={1.2} /> : ''
                    }
                </AnimatePresence>
            </MessageSendStatusContainer>
        </>
    );
};

const MessageSendStatusContainer = styled.div`
    margin: 0 .3rem;
`;

export default memo(MessageSendStatus);
