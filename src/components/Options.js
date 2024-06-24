import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './message/MessageBox';
import MessageOptions from './message/MessageOptions';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

const ChatOptions = ({ messageOptions, setMessageOptions, type }) => {
    const chatOptionsMessageRef = useRef();
    const [noTopPositionChange, setNoTopPositionChange] = useState(false);
    const [zeroScale, setZeroScale] = useState(false);

    const closeOptions = (data) => {
        if (data?.type == 'TRASH' || data?.type == 'RESTORE') {
            setZeroScale(true);
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
                setZeroScale(false);
            }, 400);
        } else {
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
            }, 600);
        }
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
                    onClick={closeOptions}
                    styles={{
                        top: messageOptions?.data?.top,
                        left: messageOptions?.data?.left,
                        width: messageOptions?.data?.width,
                        height: messageOptions?.data?.height,
                        isMocalMessage: messageOptions?.data?.isLocalMessage,
                        chatOptionsStatus: messageOptions?.animationStatus,
                        phoneHeightDifference: window.outerHeight - window.innerHeight,
                        noTopPositionChange: noTopPositionChange,
                        zeroScale: zeroScale,
                    }}
                >
                    <div className='message-box' ref={chatOptionsMessageRef}>
                        <MessageBox
                            data={{
                                type: type,
                                replyTo: messageOptions?.data?.replyTo,
                                arrayText: messageOptions?.data?.arrayText,
                                plainText: messageOptions?.data?.plainText,
                                messageStyles: {
                                    ...messageOptions?.data?.messageStyles,
                                    width: messageOptions?.data?.width,
                                    height: messageOptions?.data?.height,
                                    type: 'OPTIONS',
                                    localmessage: messageOptions?.data?.isLocalMessage ? 1 : 0,
                                    persian: messageOptions?.data?.isTextPersian ? 1 : 0,
                                    letters: messageOptions?.data?.textLetters,
                                    position: messageOptions?.data?.messagePosition,
                                    reply: messageOptions?.data?.replyTo != 'no_reply' ? 1 : 0,
                                    chatOptionsStatus: messageOptions?.animationStatus,
                                }
                            }}
                        />
                        <AnimatePresence>
                        {
                            messageOptions?.animationStatus == 2 && !zeroScale ?
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
    transition: backdrop-filter .3s, background .4s;
    z-index: 5;

    .message-box {
        position: absolute;
        /* top: ${props => props.styles.chatOptionsStatus != 2 || props.styles.noTopPositionChange ? `${props.styles.top}px` : '45%'}; */
        top: ${props => `${props.styles.top}px`};
        left: ${props => `${props.styles.left}px`};
        width: ${props => `${props.styles.width}px`};
        height: ${props => `${props.styles.height}px`};
        display: flex;
        justify-content: flex-end;
        align-items: ${props => props.styles.isMocalMessage ? 'flex-end' : 'flex-start'};
        flex-direction: column;
        transform: ${props => props.styles.zeroScale ? 'scale(0)' : props.styles.chatOptionsStatus == 2 ? 'scale(1.05)' : 'scale(1)'};
        /* margin: ${props => props.styles.chatOptionsStatus == 2 && props.styles.isMocalMessage ? '0 0rem 0 -2rem' : props.styles.chatOptionsStatus == 2 && !props.styles.isMocalMessage ? '0 0 0 2rem' : ''}; */
        transition: transform .4s cubic-bezier(0.53, 0, 0, 0.98);
    }

    @media (max-width: 745px) {
        .message-box {
            top: ${props => `${props.styles.top + 52.5}px`};
        }
    }
`;

export default ChatOptions;