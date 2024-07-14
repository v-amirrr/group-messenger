import React from 'react';
import { LuTextSelect } from "react-icons/lu";
import { BsReplyFill } from 'react-icons/bs';
import { IoIosClose } from "react-icons/io";
import { motion } from 'framer-motion';

const OptionsButtonsEdit = ({ optionClick, setVariants }) => {
    return (
        <>
            <motion.div
                className='edit-back'
                onClick={() => optionClick('EDIT_BACK')}
                key='edit-back' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
            >
                <i><IoIosClose /></i>
            </motion.div>

            <motion.div
                className='edit-text'
                onClick={() => optionClick('EDIT_TEXT')}
                key='edit-text' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
            >
                <i><LuTextSelect /></i>
                <p>Edit Text</p>
            </motion.div>

            <motion.div
                className='edit-reply'
                onClick={() => optionClick('EDT_REPLY')}
                key='edit-reply' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
            >
                <i><BsReplyFill /></i>
                <p>Edit Reply</p>
            </motion.div>
        </>
    );
};

export default OptionsButtonsEdit;