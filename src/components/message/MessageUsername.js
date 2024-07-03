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
    top: ${props => props.data.dateShown ? "1.83rem" : ".62rem"};
    max-width: 8rem;
    background-color: #151515;
    color: var(--grey);
    box-shadow: var(--shadow);
    border-radius: 50px 50px 50px 35px;
    margin-left: ${props => props.data.selectMode ? '3rem' : ''};
    margin-right: .2rem;
    padding: 0.2rem 0.5rem 0.2rem 1rem;
    font-size: .6rem;
    font-weight: 400;
    white-space: nowrap;
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
        color: #ffffff20;
    }
`;

export default MessageUsername;