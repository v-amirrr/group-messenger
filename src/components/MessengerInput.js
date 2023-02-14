import React, { useState, useRef  } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { IoSend } from 'react-icons/io5';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MessengerInput = () => {

    const { error } = useSelector(store => store.messagesStore);

    const firebaseRef = collection(db, 'messages');
    const username = localStorage.getItem("username");

    const inputRef = useRef();

    const [input, setInput] = useState("");

    const sendMessage = e => {
        e.preventDefault();

        addDoc(firebaseRef, {
            message: input,
            username: username,
            time: serverTimestamp(),
        })
        .catch((err) => {
            console.log(err);
        });

        setInput("");
    };

    return (
        <>
            <MessengerInputContainer>
                <form>
                    <input
                        className='messenger-input'
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Send a Message..."
                        autoFocus
                        ref={inputRef}
                        dir="auto"
                        disabled={!!error}
                    />
                    <motion.button whileTap={input && { scale: 0.5 }} type="submit" className='messenger-submit' disabled={!input} onClick={sendMessage}><IoSend /></motion.button>
                </form>
            </MessengerInputContainer>
        </>
    );
};

const MessengerInputContainer = styled.div`
    background-color: #ffffff08;
    backdrop-filter: blur(5px) saturate(100%);
    -webkit-backdrop-filter: blur(20px) saturate(120%);
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 40%;
    height: 3rem;
    position: absolute;
    bottom: 1rem;

    &:disabled {
        cursor: not-allowed;
    }

    form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    
    .messenger-input {
        color: #fff;
        border: none;
        padding: .8rem;
        background-color: #00000000;
        font-family: ${props => props.isPersian ? "Vazirmatn" : "Outfit"}, "Vazirmatn", sans-serif;
        font-weight: 200;
        font-size: 1rem;
        width: 100%;
        height: 90%;
        resize: none;

        /* width */
        ::-webkit-scrollbar {
            width: 0;
        }
    }

    .messenger-submit {
        font-size: 1.5rem;
        padding: .5rem .8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #00000000;
        color: #ffffff88;
        cursor: pointer;
        transition: color .4s;

        &:disabled {
            cursor: not-allowed;
            color: #ffffff44;
        }

        &:not(:disabled) {
            &:hover {
                color: #ffffff;
            }
        }
    }

    @media (max-width: 768px) {
        bottom: -1rem;
    }
`;


export default MessengerInput;