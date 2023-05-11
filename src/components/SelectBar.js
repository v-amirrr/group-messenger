import React from 'react';
import { useSelect } from '../hooks/useSelect';
import { IoClose } from 'react-icons/io5';
import { AiFillDelete, AiFillCopy } from 'react-icons/ai';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const selectBarVariants = {
    hidden: { opacity: 0, y: -20, scaleY: 0.8 },
    visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, scaleY: 0.8, transition: { duration: 0.2 } }
};

const SelectBar = () => {

    const { clearSelectedMessages, copySelectedMessages, deleteSelectedMessages } = useSelect();

    const { selectedMessages } = useSelector(store => store.userStore);

    return (
        <>
            <SelectBarContainer initial='hidden' animate='visible' exit='exit' variants={selectBarVariants}>
                <div className='close' onClick={clearSelectedMessages}><IoClose /></div>
                <div className='count'>{selectedMessages.length}</div>

                <div className='options'>
                    <motion.div className='copy' whileTap={{ scale: 0.8 }} onClick={copySelectedMessages}>
                        <i><AiFillCopy /></i>
                        <p>Copy</p>
                    </motion.div>
                    <motion.div className='delete' whileTap={{ scale: 0.8 }} onClick={deleteSelectedMessages}>
                        <i><AiFillDelete /></i>
                        <p>Delete</p>
                    </motion.div>
                </div>
            </SelectBarContainer>
        </>
    );
};

const SelectBarContainer = styled(motion.div)`
    position: absolute;
    top: .8rem;
    background-color: #ffffff08;
    backdrop-filter: blur(10px) saturate(100%);
    -webkit-backdrop-filter: blur(10px) saturate(100%);
    width: 20rem;
    height: 2.8rem;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    user-select: none;

    .close {
        position: absolute;
        right: .5rem;
        background-color: #ffffff08;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        font-size: 1.3rem;
        cursor: pointer;
    }

    .count {
        position: absolute;
        left: .5rem;
        background-color: #ffffff08;
        border-radius: 50%;
        font-size: 1rem;
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .options {
        display: flex;
        justify-content: center;
        align-items: center;

        .copy, .delete {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff08;
            margin: 0 .2rem;
            width: 5rem;
            height: 2rem;
            border-radius: 15px;
            cursor: pointer;

            i {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: .2rem;
            }

            p {
                font-size: .8rem;
            }
        }
    }
`;

export default SelectBar;