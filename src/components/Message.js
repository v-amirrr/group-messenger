import React, { forwardRef } from 'react';

import styled from 'styled-components';

const Message = forwardRef(( props, ref ) => {

    const localStorageUsername = JSON.parse(localStorage.getItem("username"));

    const { message, id, username } = props;

    const isRTL = (text) => {           
        let ltrChars = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
            rtlChars = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
            rtlDirCheck = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');
        return rtlDirCheck.test(text);
    };

    return (
        <>
            <MessageBox ref={ref} key={id} isUser={username == localStorageUsername} isPersian={isRTL(message)}>
                <p className='username' dir="auto">{username}</p>
                <p className='message'>{message}</p>
            </MessageBox>
        </>
    );
});

const MessageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: ${props => props.isUser ? "#ffffff10" : "#ffffff15"};
    margin: .4rem 0;
    margin-left: ${props => props.isUser && "auto"};
    padding: .5rem .8rem; 
    border-radius: 20px;
    width: fit-content;
    max-width: 80%;
    backdrop-filter: blur(50px) saturate(150%);
    -webkit-backdrop-filter: blur(50px) saturate(150%);
    font-weight: 200;
    word-break: break-all;
    cursor: pointer;

    .username {
        display: ${props => props.isUser ? "none" : ""};
        color: #aaa;
        font-size: .8rem;
        margin-right: .5rem;
        word-break: break-all;
    }

    .message {
        text-align: ${props => props.isPersian ? "right" : "left"};
        word-spacing: 1px;
        letter-spacing: -.5px;
        word-break: break-all;
        font-family: ${props => props.isPersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
    }
`;

export default Message;