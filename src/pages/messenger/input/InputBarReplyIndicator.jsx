import React, { memo } from 'react';
import { useOptions } from '../../../hooks/useOptions';
import { useSkeletonEffect } from '../../../hooks/useSkeletonEffect';
import { IoClose } from 'react-icons/io5';
import { BsReplyFill } from 'react-icons/bs';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { inputBarReplyIndicator } from '../../../config/variants';
import { useSelector } from 'react-redux';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const InputBarReplyIndicator = memo(({ emojiPickerShow }) => {
    const inputReply = useSelector(store => store.inputStore.inputReply);
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
            addSkeletonEffect(inputReply?.id);
        }, 1000);
    };

    const clearInputReply = (e) => {
        e.stopPropagation();
        unReply();
    };

    return (
        <AnimatePresence>
            {
                inputReply?.id ?
                <InputBarReplyIndicatorContainer {...framerMotionAttributes(inputBarReplyIndicator)} emojiPickerShow={emojiPickerShow}>
                    <div className='reply-message' onClick={clickHandler} onMouseEnter={hoverHandler} onMouseLeave={unhoverHandler}>
                        <i className='icon'><BsReplyFill /></i>
                        <p className='text'>{inputReply?.message}</p>
                    </div>
                    <button className='reply-close-button' onClick={(e) => clearInputReply(e)}><IoClose /></button>
                </InputBarReplyIndicatorContainer> : ''
            }
        </AnimatePresence>
    );
});

const InputBarReplyIndicatorContainer = styled(motion.div)`
    position: absolute;
    bottom: ${props => props.emojiPickerShow ? '12.5rem' : '2.5rem'};
    max-width: 16.5rem;
    min-width: 2rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.09rem;
    border-radius: 20px 20px 0 0;
    background-color: var(--bg);
    box-shadow: var(--shadow);
    backdrop-filter: var(--glass);
    border-top: solid 0.1px #202020;
    cursor: pointer;
    z-index: 3;
    transition: bottom .6s cubic-bezier(.53,0,0,.98), margin .6s;
    transition: ${props => props.emojiPickerShow ? 'bottom .6s cubic-bezier(.53,0,0,.98)' : 'bottom .4s cubic-bezier(.53,0,0,.98)'};

    .reply-message {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
        margin: 0 .4rem;
        overflow: hidden;
        font-family: 'Outfit', 'Vazirmatn', sans-serif;
        color: var(--grey);
        font-weight: 300;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .9rem;
            margin-right: .05rem;
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
    }
`;

export default InputBarReplyIndicator;