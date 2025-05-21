import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSlice, setOptionsAnimationStatus, setOptionsButtonsStage } from '../../../redux/optionsSlice';
import MessageBox from '../message/MessageBox';
import OptionsButtonHandler from './OptionsButtonHandler';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { optionsGlassVariants } from '../../../config/varitans';

const ChatOptions = ({ type }) => {
    const chatOptionsMessageRef = useRef();
    const dispatch = useDispatch();
    const { optionsMessage, optionsAnimationStatus, optionsButtonsStage } = useSelector(store => store.optionsStore);

    const optionsClickHandler = (e) => {
        if (!chatOptionsMessageRef?.current?.contains(e?.target)) {
            closeOptions();
        }
    };

    const closeOptions = () => {
        dispatch(setOptionsButtonsStage(4));
        dispatch(setOptionsAnimationStatus(3));
        setTimeout(() => {
            dispatch(clearSlice());
        }, 300);
    };

    useEffect(() => {
        if (optionsMessage?.id) {
            dispatch(setOptionsAnimationStatus(2));
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
                        }}
                    >
                        <div className='message-box' ref={chatOptionsMessageRef}>
                            <MessageBox
                                editingMode={optionsButtonsStage == 3}
                                data={{
                                    type: type,
                                    replyTo: optionsMessage?.replyTo,
                                    arrayText: optionsMessage?.arrayText,
                                    plainText: optionsMessage?.plainText,
                                }}
                                styles={{
                                    ...optionsMessage?.styles,
                                    optionsMessage: true,
                                    persian: optionsMessage?.isTextPersian ? 1 : 0,
                                    editingMode: optionsButtonsStage == 3,
                                }}
                            />
                            <AnimatePresence>
                            {
                                optionsAnimationStatus == 2 ?
                                <OptionsButtonHandler
                                    type={type}
                                    optionsClickHandler={optionsClickHandler}
                                    closeOptions={closeOptions}
                                /> : ''
                            }
                            </AnimatePresence>
                        </div>
                        <AnimatePresence exitBeforeEnter>
                            {
                                optionsAnimationStatus == 2 ?
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
    height: 100dvh;
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
        z-index: 6;
        opacity: ${props => props.styles.zeroScale ? 0 : 1};
        transform: ${props => props.styles.animationStatus == 2 ? 'scale(1.08)' : 'scale(1)'};
        transition: ${props => props.styles.animationStatus == 2 ? 'transform .6s cubic-bezier(0.3, 0, 0, 1.55)' : 'transform .2s'}, opacity .3s;
    }
`;

const OptionsGlass = styled(motion.div)`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #00000066;
    backdrop-filter: var(--glass);
    z-index: 5;
`;

export default ChatOptions;