import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, setOptionsAnimationStatus } from '../redux/optionsSlice';
import MessageBox from './message/MessageBox';
import OptionsButtons from './OptionsButtons';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { optionsGlassVariants } from '../config/varitans';

const ChatOptions = ({ type }) => {
    const chatOptionsMessageRef = useRef();
    const dispatch = useDispatch();
    const { optionsMessage, optionsAnimationStatus, editText } = useSelector(store => store.optionsStore);
    const [noTopPositionChange, setNoTopPositionChange] = useState(false);
    const [zeroScale, setZeroScale] = useState(false);

    const optionsClickHandler = (e, type) => {
        if(type == 'TRASH' || type == 'RESTORE') {
            deleteOptions();
        } else if (!chatOptionsMessageRef?.current?.contains(e?.target)) {
            closeOptions();
        }
    };

    const deleteOptions = () => {
        setZeroScale(true);
        dispatch(setOptionsAnimationStatus(3));
        setTimeout(() => {
            dispatch(reset());
            setZeroScale(false);
    }, 400);
    };

    const closeOptions = () => {
        dispatch(setOptionsAnimationStatus(3));
        setTimeout(() => {
            dispatch(reset());
        }, 350);
    };

    useEffect(() => {
        if (optionsMessage?.id) {
            dispatch(setOptionsAnimationStatus(2));
        }
        if (optionsMessage?.ref?.current?.getBoundingClientRect()?.top > 250 && optionsMessage?.ref?.current?.getBoundingClientRect()?.top < 350) {
            setNoTopPositionChange(true);
        } else {
            setNoTopPositionChange(false);
        }
    }, [optionsMessage]);

    return (
        <>
            {
                optionsAnimationStatus ?
                <>
                    <OptionsContainer
                        onClick={(e) => optionsClickHandler(e, null)}
                        styles={{
                            top: optionsMessage?.top,
                            left: optionsMessage?.left,
                            width: optionsMessage?.width,
                            height: optionsMessage?.height,
                            isLocalMessage: optionsMessage?.isLocalMessage,
                            animationStatus: optionsAnimationStatus,
                            phoneHeightDifference: window.outerHeight - window.innerHeight,
                            noTopPositionChange: noTopPositionChange,
                            zeroScale: zeroScale,
                        }}
                    >
                        <div className='message-box' ref={chatOptionsMessageRef}>
                            <MessageBox
                                key={optionsMessage?.id}
                                editable={editText}
                                data={{
                                    type: type,
                                    replyTo: optionsMessage?.replyTo,
                                    arrayText: optionsMessage?.arrayText,
                                    plainText: optionsMessage?.plainText,
                                }}
                                styles={{
                                    ...optionsMessage?.styles,
                                    width: optionsMessage?.width,
                                    height: optionsMessage?.height,
                                    type: type,
                                    localmessage: optionsMessage?.isLocalMessage ? 1 : 0,
                                    persian: optionsMessage?.isTextPersian ? 1 : 0,
                                    letters: optionsMessage?.textLetters,
                                    position: optionsMessage?.messagePosition,
                                    reply: optionsMessage?.replyTo != 'no_reply' ? 1 : 0,
                                    chatOptionsStatus: optionsMessage?.optionsAnimationStatus,
                                    editable: editText,
                                }}
                            />
                            <AnimatePresence>
                            {
                                optionsAnimationStatus == 2 && !zeroScale ?
                                <OptionsButtons
                                    type={type}
                                    optionsClickHandler={optionsClickHandler}
                                    closeOptions={closeOptions}
                                /> : ''
                            }
                            </AnimatePresence>
                        </div>
                        <AnimatePresence exitBeforeEnter>
                            {
                                optionsAnimationStatus == 2 && !zeroScale ?
                                <OptionsGlass initial='hidden' animate='visible' exit='exit' variants={optionsGlassVariants} /> : ''
                            }
                        </AnimatePresence>
                    </OptionsContainer>
                </> : ''
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
        position: absolute;
        top: ${props => `${props.styles.top}px`};
        left: ${props => `${props.styles.left}px`};
        width: ${props => `${props.styles.width}px`};
        height: ${props => `${props.styles.height}px`};
        display: flex;
        justify-content: flex-end;
        align-items: ${props => props.styles.isLocalMessage ? 'flex-end' : 'flex-start'};
        flex-direction: column;
        z-index: 5;
        opacity: ${props => props.styles.zeroScale ? 0 : 1};
        transform: ${props => props.styles.zeroScale ? 'scale(0.5)' : props.styles.animationStatus == 2 ? 'scale(1.05)' : 'scale(1)'};
        transition: transform .2s, opacity .3s;
    }

    @media (max-width: 745px) {
        .message-box {
            /* top: ${props => `${props.styles.top + 52.5}px`}; */
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