import React, { useState } from 'react';

import { Input, Button } from '@mui/material';

import { IoSend } from 'react-icons/io5';

import styled from 'styled-components';

import { motion } from 'framer-motion';

const messengerTitleVariants = {
    hidden: { opacity: 0, y: -100, scaleX: 0 },
    visible: { opacity: 1, y: 0, scaleX: 1 , transition: { duration: 0.5, type: 'tween' } },
    exit: { opacity: 0, y: -100, scaleX: 0 }
};

const messengerInputVariants = {
    hidden: { opacity: 0, y: 100, scaleX: 0 },
    visible: { opacity: 1, y: 0, scaleX: 1 , transition: { duration: 0.5, type: 'tween' } },
    exit: { opacity: 0, y: 100, scaleX: 0 }
};

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
                    <MessengerTitle initial='hidden' animate='visible' exit='exit' variants={messengerTitleVariants}>
                        <h1>Group Messenger</h1>
                    </MessengerTitle>

                    {/* Messages */}
                    
                    <MessengerInput initial='hidden' animate='visible' exit='exit' variants={messengerInputVariants}>
                        <form>
                            <Input 
                                className='messenger-input' 
                                type="text" 
                                value={input} 
                                onChange={(e) => setInput(e.target.value)} 
                                placeholder="Write a Message..." 
                                autoFocus
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
    background-color: #000000dd;
`;

const MessengerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    text-align: center;
    width: 50%;
    height: 100%;
    padding: 1rem 0;

    @media (max-width: 700px) {
        width: 90%;
    }
`;

const MessengerTitle = styled(motion.div)`
    width: 100%;
    font-family: 'Kulim Park', sans-serif;
    text-transform: uppercase;
    font-size: 1.2rem;
    white-space: nowrap;
`;

const MessengerInput = styled(motion.div)`
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