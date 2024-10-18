import React from 'react';
import { useOptions } from '../../../hooks/useOptions';
import { useSkeletonEffect } from '../../../hooks/useSkeletonEffect';
import { IoClose } from 'react-icons/io5';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { inputReplyIndicator } from '../../../config/varitans';

const ChatInputReplyIndicator = ({ inputReply, emojiPicker, emojiAnimation }) => {

    const { addSkeletonEffect, scrollToMessage } = useSkeletonEffect();
    const { unReply } = useOptions();
    let mouseLocation = 'OUT';

    const hoverHandler = () => {
        mouseLocation = 'IN';
        setTimeout(() => {
            if (mouseLocation == 'IN') {
                addSkeletonEffect(inputReply?.id);
            }
        }, 300);
    };

    const unhoverHandler = () => {
        mouseLocation = 'OUT';
    };

    const clickHandler = () => {
        scrollToMessage(inputReply?.id);
        setTimeout(() => {
            addSkeletonEffect(inputReply.id);
        }, 1000);
    };

    const clearInputReply = (e) => {
        e.stopPropagation();
        unReply();
    };

    return (
        <>
            <AnimatePresence>
                {
                    inputReply?.id ?
                    <ChatInputReplyIndicatorContainer
                        initial='hidden' animate='visible' exit='exit' variants={inputReplyIndicator}
                        emoji={emojiPicker ? 1 : 0}
                        emojiAnimation={emojiAnimation ? 1 : 0}
                    >
                        <div
                            className='reply-message'
                            onClick={clickHandler}
                            onMouseEnter={hoverHandler}
                            onMouseLeave={unhoverHandler}
                        >
                            <i className='icon'><BsReplyFill /></i>
                            <p className='text'>{inputReply.message}</p>
                        </div>
                        <button className='reply-close-button' onClick={(e) => clearInputReply(e)}><IoClose /></button>
                    </ChatInputReplyIndicatorContainer> : ''
                }
            </AnimatePresence>
        </>
    );
};

const ChatInputReplyIndicatorContainer = styled(motion.div)`
    position: absolute;
    bottom: ${props => props.emoji ? '13.4rem' : '3.4rem'};
    max-width: 17rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.09rem;
    border-radius: 20px 20px 0 0;
    background-color: var(--bg);
    box-shadow: var(--shadow);
    backdrop-filter: var(--glass);
    cursor: pointer;
    margin-bottom: ${props => props.emojiAnimation ? '2rem' : '0'} !important;
    z-index: 3;
    transition: bottom .3s cubic-bezier(.53,0,0,.98), margin .6s;

    .reply-message {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0 .4rem;
        overflow: hidden;
        font-family: ${props => (props.isrlt ? 'Vazirmatn' : 'Outfit')}, 'Vazirmatn', sans-serif;
        color: var(--grey);
        font-weight: 300;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            margin-right: .1rem;
        }

        .text {
            font-size: .8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .reply-close-button {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.2rem;
        color: var(--grey);
        background-color: var(--bg);
        border-radius: 50%;
        cursor: pointer;
        padding: .15rem;
        margin-right: .15rem;
        transition: background .2s;

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--bg-hover);
            }
        }
    }

    @media (max-width: 768px) {
        max-width: 16rem;
        border-radius: 15px 15px 0 0;
    }
`;

export default ChatInputReplyIndicator;