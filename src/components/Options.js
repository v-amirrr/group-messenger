import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './message/MessageBox';
import MessageOptions from './message/MessageOptions';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { optionsGlassVariants } from '../config/varitans';

const ChatOptions = ({ messageOptions, setMessageOptions, type }) => {
    const chatOptionsMessageRef = useRef();
    const [noTopPositionChange, setNoTopPositionChange] = useState(false);
    const [zeroScale, setZeroScale] = useState(false);

    const optionsClickHandler = (data) => {
        if (data?.type == 'TRASH' || data?.type == 'RESTORE') {
            deleteOptions();
        } else {
            closeOptions();
        }
    };

    const deleteOptions = () => {
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
        }, 400);
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
            {
                messageOptions?.animationStatus ?
                <>
                    <OptionsContainer
                        onClick={optionsClickHandler}
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
                                    styles: {
                                        ...messageOptions?.data?.styles,
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
                                        closeOptions: optionsClickHandler,
                                    }}
                                />
                                : ''
                            }
                            </AnimatePresence>
                        </div>
                        <AnimatePresence exitBeforeEnter>
                            {
                                messageOptions?.animationStatus == 2 && !zeroScale ?
                                <OptionsGlass initial='hidden' animate='visible' exit='exit' variants={optionsGlassVariants} />
                                : ''
                            }
                        </AnimatePresence>
                    </OptionsContainer>
                </>
                : ''
            }
        </>
    );
};

const OptionsContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .message-box {
        z-index: 5;
        position: absolute;
        top: ${props => `${props.styles.top}px`};
        left: ${props => `${props.styles.left}px`};
        width: ${props => `${props.styles.width}px`};
        height: ${props => `${props.styles.height}px`};
        display: flex;
        justify-content: flex-end;
        align-items: ${props => props.styles.isMocalMessage ? 'flex-end' : 'flex-start'};
        flex-direction: column;
        transform: ${props => props.styles.zeroScale ? 'scale(0)' : props.styles.chatOptionsStatus == 2 ? 'scale(1.05)' : 'scale(1)'};
        transition: ${props => props.styles.chatOptionsStatus == 2 ? 'transform .4s cubic-bezier(0.53, 0, 0, 0.98)' : 'transform .3s cubic-bezier(0.53, 0, 0, 0.98)'};
        transition: ${props => props.styles.chatOptionsStatus == 2 ? 'transform .4s cubic-bezier(0.53, 0, 0, 0.98)' : 'transform .3s cubic-bezier(0.53, 0, 0, 0.98)'};
    }

    @media (max-width: 745px) {
        .message-box {
            top: ${props => `${props.styles.top + 52.5}px`};
        }
    }
`;

const OptionsGlass = styled(motion.div)`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #00000088;
    backdrop-filter: var(--glass);
    z-index: 4;
`;

export default ChatOptions;