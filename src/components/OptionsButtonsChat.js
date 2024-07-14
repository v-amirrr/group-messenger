import React from 'react';
import { AiFillDelete, AiFillCopy, AiFillEdit } from 'react-icons/ai';
import { BsReplyFill } from 'react-icons/bs';
import { BiSelectMultiple } from 'react-icons/bi';
import { motion } from 'framer-motion';

const OptionsButtonsChat = ({ optionClick, setVariants, replyAlreadyClicked, isMessageLocal }) => {
    return (
        <>
            <motion.div
                className='reply'
                onClick={() => optionClick('REPLY')}
                key='reply' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
            >
                <i><BsReplyFill /></i>
                <p>{replyAlreadyClicked ? 'Unreply' : 'Reply'}</p>
            </motion.div>
            <motion.div
                className='select'
                onClick={() => optionClick('SELECT')}
                key='select' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
            >
                <i><BiSelectMultiple /></i>
                <p>Select</p>
            </motion.div>
            <motion.div
                className='copy'
                onClick={() => optionClick('COPY')}
                key='copy' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
            >
                <i><AiFillCopy /></i>
                <p>Copy</p>
            </motion.div>
            {
                isMessageLocal ?
                <>
                    <motion.div
                        className='edit'
                        onClick={() => optionClick('EDIT')}
                        key='edit' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
                    >
                        <i><AiFillEdit /></i>
                        <p>Edit</p>
                    </motion.div>
                    <motion.div
                        className='trash'
                            onClick={() => optionClick('TRASH')}
                            key='trash' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
                        >
                        <i><AiFillDelete /></i>
                        <p>Delete</p>
                    </motion.div>
                </> : ''
            }
        </>
    );
};

export default OptionsButtonsChat;