import React from 'react';
import { TiUser } from 'react-icons/ti';
import styled from 'styled-components';

const MessageUsername = ({ show, username, dateShown, messagesSelected }) => {
    return (
        <>
            {
                show ?
                <MessageUsernameContainer dateshown={dateShown} messagesselected={messagesSelected}>
                    <i><TiUser /></i>
                    {username}
                </MessageUsernameContainer>
                : ''
            }
        </>
    );
};

const MessageUsernameContainer = styled.div`
    position: absolute;
    top: ${props => props.dateshown ? "1.83rem" : ".64rem"};
    max-width: 8rem;
    margin-left: ${props => props.messagesselected ? '3rem' : ''};
    padding: 0.2rem 0.5rem 0.2rem 1.2rem;
    background-color: #ffffff0b;
    border-radius: 50px 50px 50px 20px;
    margin-right: .2rem;
    font-size: 0.6rem;
    font-weight: 400;
    white-space: nowrap;
    color: var(--pale-color);
    box-shadow: var(--bold-shadow);
    text-overflow: ellipsis;
    overflow: hidden;
    transition: margin .4s;

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
