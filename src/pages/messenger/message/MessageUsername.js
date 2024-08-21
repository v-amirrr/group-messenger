import React from 'react';
import { TiUser } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MessageUsername = ({ uid, isUserSelecting, showMessageDate }) => {
    const { usernames } = useSelector(store => store.firestoreStore);
    return (
        <>
            <MessageUsernameContainer data={{ isUserSelecting, showMessageDate }}>
                <i><TiUser /></i>
                {usernames[uid]}
            </MessageUsernameContainer>
        </>
    );
};

const MessageUsernameContainer = styled.div`
    position: absolute;
    top: ${props => props.data.showMessageDate ? "1.83rem" : ".62rem"};
    max-width: 8rem;
    background-color: var(--bg);
    color: var(--grey);
    box-shadow: var(--shadow);
    border-radius: 50px;
    margin-left: ${props => props.data.isUserSelecting ? '1.8rem' : ''};
    margin-right: .2rem;
    padding: .2rem .5rem .2rem 1rem;
    font-size: .6rem;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: margin .4s;

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