import React from 'react';
import { TiUser } from 'react-icons/ti';
import styled from 'styled-components';

const MessageUsername = ({ username, show, chatdate, anymessageselected }) => {
    return (
        <>
            {show ? (
                <MessageUsernameContainer chatdate={chatdate} anymessageselected={anymessageselected}>
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
    font-size: 0.6rem;
    font-weight: 300;
    margin-right: 0.2rem;
    white-space: nowrap;
    position: absolute;
    top: ${props => props.chatdate ? "34%" : "15%"};
    margin-left: ${(props) => props.anymessageselected ? '3rem' : ''};
    font-weight: 400;
    color: var(--pale-color);
    background-color: #ffffff0b;
    box-shadow: var(--bold-shadow);
    border-radius: 50px 50px 50px 10px;
    padding: 0.2rem 0.5rem 0.2rem 1.2rem;
    max-width: 8rem;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: margin 0.4s;

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
