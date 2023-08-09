import React from 'react';
import { TiUser } from "react-icons/ti";
import styled from 'styled-components';

const MessageUsername = ({ username, show }) => {
    return (
        <>
            {show ?
            <MessageUsernameContainer>
            <i><TiUser /></i>
                {username}
            </MessageUsernameContainer>
            : ""}
        </>
    );
};

const MessageUsernameContainer = styled.div`
    display: inline-block;
    font-size: .6rem;
    font-weight: 300;
    margin-right: .2rem;
    white-space: nowrap;
    position: relative;
    bottom: -.15rem;
    right: .2rem;
    font-weight: var(--text-boldness-second);
    color: var(--text-color-second);
    background-color: var(--message);
    border-radius: 50px;
    padding: .2rem .5rem .2rem 1.2rem;
    max-width: 6.5rem;
    text-overflow: ellipsis;
    overflow: hidden;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .8rem;
        margin-right: .2rem;
        position: absolute;
        left: .3rem;
        color: var(--text-color-first);
    }
`;

export default MessageUsername;