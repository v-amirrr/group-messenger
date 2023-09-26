import React, { useState, useEffect } from 'react';
import { useSelect } from '../hooks/useSelect';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { AiFillDelete, AiFillCopy } from 'react-icons/ai';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { selectBarVariants } from '../config/varitans';

const SelectBar = () => {

    const { selectedMessages, selectOthersMessage } = useSelector(store => store.appStore);

    const { clearSelectedMessages, copySelectedMessages, trashSelectedMessages } = useSelect();

    const [counterOne, setCounterOne] = useState(selectedMessages.length);
    const [counterTwo, setCounterTwo] = useState(selectedMessages.length);
    const [changeCounter, setChangeCounter] = useState(false);

    useEffect(() => {
        if (selectedMessages.length != 0) {
            setCounterTwo(selectedMessages.length);
        }
    }, [selectedMessages.length]);

    useEffect(() => {
        setChangeCounter(true);
        setTimeout(() => {
            setCounterOne(selectedMessages.length);
            setChangeCounter(false);
        }, 400);
    }, [counterTwo]);

    return (
        <>
            <SelectBarContainer initial='hidden' animate='visible' exit='exit' variants={selectBarVariants} changecounter={changeCounter ? 1 : 0}>
                <motion.button className='close' onClick={clearSelectedMessages}><IoClose /></motion.button>
                <div className='count'>
                    <p className='counter-one'>{counterOne}</p>
                    <p className='counter-two'>{counterTwo}</p>
                </div>

                <div className='options'>
                    <button className='copy' onClick={copySelectedMessages}>
                        <i><AiFillCopy /></i>
                        <p>Copy</p>
                    </button>
                    <hr />
                    <button className='delete' disabled={selectOthersMessage} onClick={trashSelectedMessages}>
                        <i><AiFillDelete /></i>
                        <p>Delete</p>
                    </button>
                </div>
            </SelectBarContainer>
        </>
    );
};

const SelectBarContainer = styled(motion.div)`
    position: absolute;
    bottom: .8rem;
    border: var(--border-first);
    border-radius: 50px;
    backdrop-filter: var(--glass-first);
    -webkit-backdrop-filter: var(--glass-first);
    width: 22rem;
    height: 2.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    overflow: hidden;
    box-shadow: var(--shadow-first);
    transition: bottom .4s;
    z-index: 999;

    .close {
        position: absolute;
        right: .3rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        font-size: 1.4rem;
        cursor: pointer;
        transition: background .2s, box-shadow .2s;
        z-index: 3;
        color: var(--text-color-third);
    }

    .count {
        position: absolute;
        left: .3rem;
        font-size: 1rem;
        font-weight: 200;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--text-color-third);
        font-weight: var(--text-boldness-second);

        .counter-one {
            position: absolute;
            opacity: ${props => props.changecounter ? "0" : "1"};
            top: ${props => props.changecounter ? "2rem" : "50%"};
            transform: translate(0, -50%);
            transition: ${props => props.changecounter ? "top .2s, opacity .2s" : ""};
        }

        .counter-two {
            position: absolute;
            opacity: ${props => props.changecounter ? "1" : "0"};
            top: ${props => props.changecounter ? "50%" : "-.5rem"};
            transform: translate(0, -50%);
            transition: ${props => props.changecounter ? "top .2s, opacity .2s" : ""};
        }
    }

    .options {
        display: flex;
        justify-content: center;
        align-items: center;

        .copy, .delete {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            margin: 0 .2rem;
            width: 5rem;
            height: 2rem;
            letter-spacing: -1px;
            word-spacing: 5px;
            opacity: 1;
            color: var(--text-color-third);
            cursor: pointer;
            transition: background .2s, color .2s;

            &:disabled {
                color: var(--text-color-second);
                cursor: not-allowed;
            }

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: .2rem;
                font-size: 1rem;
            }

            p {
                font-size: .9rem;
                font-weight: var(--text-boldness-second);
            }
        }

        hr {
            border: none;
            border-radius: var(--radius-fifth);
            width: .01rem;
            height: 1.2rem;
            background-color: var(--hr-second);
        }
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        .close, .copy, .delete {
            &:hover {
                background-color: var(--button-hover);
                box-shadow: var(--shadow-first);
            }
        }
    }

    @media (max-width: 500px) {
        width: 18rem;
        height: 3rem;
        margin-right: 4rem;
    }
`;

export default SelectBar;