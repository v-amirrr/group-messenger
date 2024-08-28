import React from 'react';
import Check from '../../common/Check';
import { useOptions } from '../../hooks/useOptions';
import { IoIosClose } from "react-icons/io";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { editReplyBarVariatns } from '../../config/varitans';

const EditReplyBar = () => {
    const { deactivateEditReply, editReply } = useOptions();
    return (
        <>
            <EditReplyContainer initial='hidden' animate='visible' exit='exit' variants={editReplyBarVariatns}>
                <motion.button className='ok' onClick={editReply}>
                    <Check scale={1.4} />
                </motion.button>
                <motion.button className='cancel' onClick={deactivateEditReply}>
                    <i><IoIosClose /></i>
                </motion.button>
            </EditReplyContainer>
        </>
    );
};

const EditReplyContainer = styled(motion.div)`
    position: absolute;
    bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;

    button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.25rem;
        height: 2.25rem;
        margin: 0 .2rem;
        border-radius: 50%;
        box-shadow: var(--shadow);
        backdrop-filter: var(--glass);
        background-color: var(--bg);
        transition: background .2s;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2.2rem;
        }

        @media (hover: hover) and (pointer: fine) and (min-width: 745px) {
            &:hover {
                background-color: var(--bg-hover);
            }
        }
    }

    .ok {
        padding: .3rem;
    }
`;

export default EditReplyBar;