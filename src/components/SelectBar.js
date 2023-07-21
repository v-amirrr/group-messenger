import React, { useState, useEffect } from 'react';
import { useSelect } from '../hooks/useSelect';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { AiFillDelete, AiFillCopy } from 'react-icons/ai';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { selectBarVariants } from '../config/varitans';

const SelectBar = () => {

    const { clearSelectedMessages, copySelectedMessages, deleteSelectedMessages } = useSelect();

    const { selectedMessages, enterAsAGuest, selectOthersMessage } = useSelector(store => store.userStore);

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
        }, 800);
    }, [counterTwo]);

    return (
        <>
            <SelectBarContainer initial='hidden' animate='visible' exit='exit' variants={selectBarVariants} userbutton={!enterAsAGuest && !selectOthersMessage ? 1 : 0} changecounter={changeCounter ? 1 : 0}>
                <motion.button className='close' onClick={clearSelectedMessages}><IoClose /></motion.button>
                <div className='count'>
                    <p className='counter-one'>{counterOne}</p>
                    <p className='counter-two'>{counterTwo}</p>
                </div>

                <div className='options'>
                    <motion.button className='copy' onClick={copySelectedMessages}>
                        <i><AiFillCopy /></i>
                        <p>Copy</p>
                    </motion.button>
                    <motion.button className='delete' onClick={deleteSelectedMessages}>
                        <i><AiFillDelete /></i>
                        <p>Delete</p>
                    </motion.button>
                </div>
            </SelectBarContainer>
        </>
    );
};

const SelectBarContainer = styled(motion.div)`
    position: absolute;
    bottom: .8rem;
    /* background-color: var(--select-bar); */
    border: solid 1px #ffffff14;
    backdrop-filter: var(--select-bar-blur);
    -webkit-backdrop-filter: var(--select-bar-blur);
    width: 20rem;
    height: 2.8rem;
    border-radius: var(--select-bar-border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    user-select: none;
    overflow: hidden;
    transition: bottom .4s;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

    .close {
        position: absolute;
        right: .5rem;
        background-color: var(--select-bar-button);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        font-size: 1.3rem;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        transition: background .2s;
        z-index: 3;
    }

    .count {
        position: absolute;
        left: .5rem;
        /* background-color: var(--select-bar-button); */
        border-radius: 50%;
        font-size: 1rem;
        font-weight: 200;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

        .counter-one {
            position: absolute;
            opacity: ${props => props.changecounter ? "0" : "1"};
            top: ${props => props.changecounter ? "2rem" : "50%"};
            transform: translate(0, -50%);
            transition: ${props => props.changecounter ? "top .4s, opacity .4s" : ""};
        }

        .counter-two {
            position: absolute;
            opacity: ${props => props.changecounter ? "1" : "0"};
            top: ${props => props.changecounter ? "50%" : "-.5rem"};
            transform: translate(0, -50%);
            transition: ${props => props.changecounter ? "top .4s, opacity .4s" : ""};
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
            background-color: var(--select-bar-button);
            margin: 0 .2rem;
            width: 5rem;
            height: 2rem;
            border-radius: 15px;
            letter-spacing: -1px;
            word-spacing: 5px;
            cursor: pointer;
            opacity: 1;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            transition: margin .4s, opacity .4s, background .2s;

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: .2rem;
                font-size: 1rem;
            }

            p {
                font-size: .8rem;
            }
        }

        .delete {
            margin-left: ${props => props.userbutton ? "" : "2rem"};
            opacity: ${props => props.userbutton ? "1" : "0"};
        }

        .copy {
            margin-left: ${props => props.userbutton ? "" : "7rem"};
        }
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        .close, .copy, .delete {
            &:hover {
                background-color: var(--select-bar-button-hover);
            }
        }
    }
`;

export default SelectBar;