import React, { useState } from 'react';

import { Input, Button } from '@mui/material';

import { IoSend } from 'react-icons/io5';

import styled from 'styled-components';

const Messenger = () => {

    const [input, setInput] = useState("");

    const sendMessage = e => {
        e.preventDefault();
        setInput("");
    };

    return (
        <>
            <MessengerPage>
                <MessengerContainer>
                    <MessengerTitle>
                        <h1>Group Messenger</h1>
                    </MessengerTitle>

                    {/* Messages */}
                    
                    <MessengerInput>
                        <form>
                            <Input 
                                className='messenger-input' 
                                type="text" 
                                value={input} 
                                onChange={(e) => setInput(e.target.value)} 
                                placeholder="Write a Message..." 
                            />
                            <Button type="submit" className='messenger-submit' disabled={!input} onClick={sendMessage}><IoSend /></Button>
                        </form>
                    </MessengerInput>
                </MessengerContainer>
            </MessengerPage>
        </>
    );
};

const MessengerPage = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const MessengerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 50%;
    height: 100%;
    padding: 2rem 0;
`;

const MessengerTitle = styled.div`
    width: 100%;
    font-family: 'Kulim Park', sans-serif;
    text-transform: uppercase;
`;

const MessengerInput = styled.div`
    background-color: #ffffff08;
    border-radius: 12px;
    font-family: 'Kulim Park', sans-serif;

    form {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .messenger-input {
        color: #fff;
        margin: 1rem;
        font-family: 'Kulim Park', sans-serif;
    }

    .messenger-submit {
        font-size: 1.5rem;
        width: 3rem;
        height: 3rem;
        margin: 1rem;
        border-radius: 50%;

        &:disabled {
            color: #ffffffbb;
        }
    }
`;

export default Messenger;