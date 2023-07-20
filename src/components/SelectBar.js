import React from 'react';
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

    return (
        <>
            <SelectBarContainer initial='hidden' animate='visible' exit='exit' variants={selectBarVariants}>
                <motion.button className='close' onClick={clearSelectedMessages}><IoClose /></motion.button>
                <div className='count'>{selectedMessages.length}</div>

                <div className='options'>
                    <motion.button className='copy' onClick={copySelectedMessages}>
                        <i><AiFillCopy /></i>
                        <p>Copy</p>
                    </motion.button>
                    {!enterAsAGuest && !selectOthersMessage ?
                    <motion.button className='delete' onClick={deleteSelectedMessages}>
                        <i><AiFillDelete /></i>
                        <p>Delete</p>
                    </motion.button>
                    : ""}
                </div>
            </SelectBarContainer>
        </>
    );
};

const SelectBarContainer = styled(motion.div)`
    position: absolute;
    top: .8rem;
    background-color: var(--select-bar);
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
    }

    .count {
        position: absolute;
        left: .5rem;
        background-color: var(--select-bar-button);
        border-radius: 50%;
        font-size: 1rem;
        font-weight: 200;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

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
    }

    @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
        .close, .copy, .delete {
            transition: background .2s;

            &:hover {
                background-color: var(--select-bar-button-hover);
            }
        }
    }
`;

export default SelectBar;