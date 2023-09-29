import React from 'react';
import { TiUser } from 'react-icons/ti';
import styled from 'styled-components';

const MessageUsername = ({ username, show }) => {
    return (
        <>
            {show ? (
                <MessageUsernameContainer>
                    <i>
                        <TiUser />
                    </i>
                    {username}
                </MessageUsernameContainer>
            ) : (
                ''
            )}
        </>
    );
};

const MessageUsernameContainer = styled.div`
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 300;
    margin-right: 0.2rem;
    white-space: nowrap;
    position: relative;
    font-weight: 400;
    color: var(--pale-color);
    background-color: var(--normal-bg);
    box-shadow: var(--bold-shadow);
    border-radius: 50px;
    padding: 0.2rem 0.5rem 0.2rem 1.2rem;
    max-width: 6.5rem;
    text-overflow: ellipsis;
    overflow: hidden;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        margin-right: 0.2rem;
        position: absolute;
        left: 0.3rem;
        color: #ffffff22;
    }
`;

export default MessageUsername;
