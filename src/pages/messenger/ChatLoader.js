import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { loaderVariants } from '../../config/varitans';

const ChatLoader = () => {
    const messages = [
        { width: '7rem', height: '2rem', position: 2, local: false },
        { width: '14rem', height: '3rem', position: 3, local: false },

        { width: '7rem', height: '2rem', position: 1, local: true },
        { width: '12rem', height: '2rem', position: 2, local: true },
        { width: '10rem', height: '2rem', position: 3, local: true },

        { width: '10rem', height: '2rem', position: 2, local: false },
        { width: '7rem', height: '2rem', position: 3, local: false },

        { width: '8rem', height: '2rem', position: 1, local: true },
        { width: '10rem', height: '3rem', position: 3, local: true },

        { width: '4rem', height: '2rem', position: 2, local: false },
        { width: '7rem', height: '2rem', position: 3, local: false },
    ];
    return (
        <>
            <ChatLoaderContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={loaderVariants}
            >
                <div className='menu'></div>
                <div className='scroll'></div>
                <div className='input'></div>
                <div className='messages'>
                    {
                        messages.map((message, index) => (
                        <MessageContainer
                            key={index}
                            className='message-container'
                            width={message.width}
                            height={message.height}
                            position={message.position}
                            local={message.local ? 1 : 0}
                        >
                            <div className={message.position == 4 ? 'date' : 'message'}></div>
                        </MessageContainer>
                        ))
                    }
                </div>
            </ChatLoaderContainer>
        </>
    );
};

const ChatLoaderContainer = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 5rem 2rem 9rem 2rem;
    background-color: #00000088;

    .profile,
    .menu,
    .scroll {
        box-sizing: content-box;
        position: absolute;
        width: 2.3rem;
        height: 2.3rem;
        border-radius: 50px;
        background-color: var(--bg);
        background-image: linear-gradient(
            90deg,
            #ffffff00 0%,
            #ffffff14 50%,
            #ffffff00 100%
        );
        background-position: left -2.3rem top 0;
        background-repeat: no-repeat;
        backdrop-filter: var(--glass);
        animation: skeleton-loading-button linear 1.5s infinite;
    }

    .menu {
        top: 1rem;
        right: 29.4%;
        z-index: 2;
    }

    .scroll {
        top: 1rem;
        right: 32%;
    }

    .input {
        box-sizing: content-box;
        position: absolute;
        bottom: 1rem;
        width: 18rem;
        height: 2.4rem;
        border-radius: 50px;
        backdrop-filter: var(--glass);
        background-color: var(--bg);
        background-image: linear-gradient(
            90deg,
            #ffffff00 0%,
            #ffffff14 50%,
            #ffffff00 100%
        );
        background-position: left -20rem top 0;
        background-repeat: no-repeat;
        animation: skeleton-loading-input linear 1.5s infinite;
    }

    @keyframes skeleton-loading-input {
        to {
            background-position: left 20rem top 0;
        }
    }

    @keyframes skeleton-loading-button {
        to {
            background-position: left 2.3rem top 0;
        }
    }

    .messages {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 47%;
        height: 100%;
        padding: 10rem 2rem 9rem 2rem;
    }

    @media (max-width: 768px) {
        width: 100vw;
        padding: 5rem 1rem 10rem 1rem;

        .menu {
            right: 1.2rem;
        }

        .scroll {
            right: 3.2rem;
        }

        .input {
            width: 15rem;
            bottom: .9rem;
        }

        .messages {
            width: 100%;
            padding: 4rem .5rem 0 .5rem;
        }
    }
`;

const MessageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${props => props.position == 4 ? 'center' : 'flex-start'};
    flex-direction: ${props => props.local ? 'row-reverse' : 'row'};
    align-items: center;

    .message {
        position: relative;
        width: ${props => props.width};
        height: ${props => props.height};
        margin: ${props =>
            props.position == 0 ?
            '.2rem 0 .2rem 0' :
            props.position == 1 ?
            '.2rem 0 .06rem 0' :
            props.position == 2 ?
            '.06rem 0 .06rem 0' :
            props.position == 3 && '.06rem 0 .2rem 0'
        };
        border-radius: ${props =>
            props.local ?
            props.position == 0 ?
            '25px' :
            props.position == 1 ?
            '25px 25px 15px 25px' :
            props.position == 2 ?
            '25px 15px 15px 25px' :
            props.position == 3 && '25px 15px 25px 25px' :
            props.position == 0 ?
            '25px' :
            props.position == 1 ?
            '25px 25px 25px 20px' :
            props.position == 2 ?
            '25px 25px 25px 15px' :
            props.position == 3 && '12px 25px 25px 25px'
        };
        backdrop-filter: var(--glass);
        background-color: var(--bg);
        background-image: linear-gradient(
            90deg,
            #ffffff00 0%,
            #ffffff07 50%,
            #ffffff00 100%
        );
        background-position: ${props => `left -12rem top 0`};
        background-repeat: no-repeat;
        animation: skeleton-loading-message linear 1.5s infinite;
    }

    @keyframes skeleton-loading-message {
        to {
            background-position: ${props => `left 12rem top 0`};
        }
    }
`;

export default ChatLoader;