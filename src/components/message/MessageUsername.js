import React from 'react';
import { TiUser } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const MessageUsername = ({ show, data }) => {
    const { usernames } = useSelector(store => store.firestoreStore);
    return (
        <>
            {
                show ?
                <MessageUsernameContainer data={data}>
                    <i><TiUser /></i>
                    {usernames[data.uid]}
                </MessageUsernameContainer>
                : ''
            }
        </>
    );
};

const MessageUsernameContainer = styled.div`
    position: absolute;
    top: ${props => props.data.dateShown ? "1.83rem" : ".64rem"};
    max-width: 8rem;
    margin-left: ${props => props.data.selectMode ? '3rem' : ''};
    padding: 0.2rem 0.5rem 0.2rem 1.1rem;
    background-color: #151515;
    border-radius: 50px 50px 50px 30px;
    margin-right: .2rem;
    font-size: .6rem;
    font-weight: 400;
    white-space: nowrap;
    color: #ffffff20;
    box-shadow: var(--normal-shadow);
    text-overflow: ellipsis;
    overflow: hidden;
    transition: margin .4s;

    i {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        position: absolute;
        left: 0.2rem;
        color: #ffffff10;
    }
`;

export default MessageUsername;
