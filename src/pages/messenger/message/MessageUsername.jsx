import React from 'react';
import { TiUser } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { messageUsernameVariants } from '../../../config/varitans';

const MessageUsername = ({ uid, showMessageDate }) => {
    const { usernames } = useSelector(store => store.firestoreStore);
    return (
        <>
            <MessageUsernameContainer initial='hidden' animate='visible' exit='exit' variants={messageUsernameVariants} data={{ showMessageDate }}>
                <i><TiUser /></i>
                {usernames[uid]}
            </MessageUsernameContainer>
        </>
    );
};

const MessageUsernameContainer = styled(motion.div)`
    position: absolute;
    top: ${props => props.data.showMessageDate ? "1.83rem" : ".62rem"};
    max-width: 8rem;
    color: var(--grey);
    margin-right: .2rem;
    padding: .2rem .5rem .2rem 1rem;
    font-size: .6rem;
    font-weight: 300;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    i {
        position: absolute;
        top: .15rem;
        left: .2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        color: #ffffff20;
    }
`;

export default MessageUsername;