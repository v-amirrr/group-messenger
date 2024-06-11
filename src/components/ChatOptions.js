import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './message/MessageBox';
import MessageOptions from './message/MessageOptions';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const ChatOptions = ({ messageOptions, setMessageOptions, type }) => {

    const chatOptionsMessageRef = useRef();
    const [noTopPositionChange, setNoTopPositionChange] = useState(false);

    const closeOptionsByTap = (e) => {
        if (!chatOptionsMessageRef?.current?.contains(e.target)) {
            closeOptions();
        }
    };

    const closeOptions = () => {
        setMessageOptions(prevState => ({
            ...prevState,
            animationStatus: 3,
        }));
        setTimeout(() => {
            setMessageOptions(prevState => ({
                ...prevState,
                data: null,
                animationStatus: 0,
            }));
        }, 500);
    };

    useEffect(() => {
        if (messageOptions?.data?.id) {
            setMessageOptions(prevState => ({
                ...prevState,
                animationStatus: 2,
            }));
        }
        if (messageOptions?.data?.ref?.current?.getBoundingClientRect()?.top > 250 && messageOptions?.data?.ref?.current?.getBoundingClientRect()?.top < 350) {
            setNoTopPositionChange(true);
        } else {
            setNoTopPositionChange(false);
        }
    }, [messageOptions?.data]);

    return (
        <>
            <AnimatePresence>
            {
                messageOptions?.animationStatus ?
                <ChatOptionsContainer
                    onClick={(e) => closeOptionsByTap(e)}
                    styles={{
                        top: messageOptions?.data?.ref?.current?.getBoundingClientRect()?.top,
                        left: messageOptions?.data?.ref?.current?.getBoundingClientRect()?.left,
                        width: messageOptions?.data?.ref?.current?.getBoundingClientRect()?.width,
                        height: messageOptions?.data?.ref?.current?.getBoundingClientRect()?.height,
                        isMocalMessage: messageOptions?.data?.isLocalMessage,
                        chatOptionsStatus: messageOptions?.animationStatus,
                        phoneHeightDifference: window.outerHeight - window.innerHeight,
                        noTopPositionChange: noTopPositionChange,
                    }}
                >
                    <div className='message-box' ref={chatOptionsMessageRef}>
                        <MessageBox
                            type={type}
                            replyTo={messageOptions?.data?.replyTo}
                            arrayText={messageOptions?.data?.arrayText}
                            plainText={messageOptions?.data?.plainText}
                            messageStyles={{
                                ...messageOptions?.data?.messageStyles,
                                width: messageOptions?.data?.ref?.current?.offsetWidth,
                                height: messageOptions?.data?.ref?.current?.offsetHeight,
                                type: 'OPTIONS',
                                localmessage: messageOptions?.data?.isLocalMessage ? 1 : 0,
                                persian: messageOptions?.data?.isTextPersian ? 1 : 0,
                                letters: messageOptions?.data?.textLetters,
                                position: messageOptions?.data?.messagePosition,
                                reply: messageOptions?.data?.replyTo != 'no_reply' ? 1 : 0,
                                chatOptionsStatus: messageOptions?.animationStatus,
                            }}
                        />
                        <AnimatePresence>
                        {
                            messageOptions?.animationStatus == 2 ?
                            <MessageOptions
                                type={type}
                                options={{
                                    messageOptions: messageOptions?.data,
                                    closeOptions: closeOptions,
                                }}
                            />
                            : ''
                        }
                        </AnimatePresence>
                    </div>
                </ChatOptionsContainer>
                : ''
            }
            </AnimatePresence>
        </>
    );
};

const ChatOptionsContainer = styled(motion.div)`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: ${props => props.styles.chatOptionsStatus == 2 ? 'var(--bold-glass)' : 'none'};
    background-color: ${props => props.styles.chatOptionsStatus == 2 ? '#00000088' : '#00000000'};
    transition: ${props => props.styles.chatOptionsStatus == 3 ? 'backdrop-filter .3s, background .3s' : 'backdrop-filter .4s, background .4s'};
    z-index: 5;

    .message-box {
        position: absolute;
        top: ${props => props.styles.chatOptionsStatus != 2 || props.styles.noTopPositionChange ? `${props.styles.top}px` : '45%'};
        left: ${props => `${props.styles.left}px`};
        width: ${props => `${props.styles.width}px`};
        height: ${props => `${props.styles.height}px`};
        display: flex;
        justify-content: flex-end;
        align-items: ${props => props.styles.isMocalMessage ? 'flex-end' : 'flex-start'};
        flex-direction: column;
        margin: ${props => props.styles.chatOptionsStatus == 2 && props.styles.isMocalMessage ? '0 0rem 0 -2rem' : props.styles.chatOptionsStatus == 2 && !props.styles.isMocalMessage ? '0 0 0 2rem' : ''};
        transform: ${props => props.styles.chatOptionsStatus != 2 ? 'translate(0%, 0%) scale(1)' : 'translate(0%, -50%) scale(1.1)'};
        transition: top .2s cubic-bezier(0.53, 0, 0, 0.98), transform .2s cubic-bezier(0.53, 0, 0, 0.98), margin .2s cubic-bezier(0.53, 0, 0, 0.98);
    }

    @media (max-width: 745px) {
        .message-box {
            top: ${props => props.styles.chatOptionsStatus != 2 ? `${props.styles.top + 52.5}px` : '45%'};
            margin: ${props => props.styles.chatOptionsStatus == 2 && props.styles.isMocalMessage ? '0 0rem 0 -1.5rem' : props.styles.chatOptionsStatus == 2 && !props.styles.isMocalMessage ? '0 0 0 1.5rem' : ''};
        }
    }
`;

export default ChatOptions;