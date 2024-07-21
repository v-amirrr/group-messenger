import React from 'react';
import { MdRebaseEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { TbTextScan2 } from "react-icons/tb";
import { motion } from 'framer-motion';

const OptionsEditMenu = ({ optionClick, setVariants, optionsMessageReplyTo }) => {
    return (
        <>
            <motion.div
                className='edit-back'
                onClick={() => optionClick('EDIT_BACK')}
                key='edit-back2' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
            >
                <i><IoIosClose /></i>
            </motion.div>

            <motion.div
                className='edit-text'
                onClick={() => optionClick('EDIT_TEXT')}
                key='edit-text2' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
            >
                <i><TbTextScan2 /></i>
                <p>Edit Text</p>
            </motion.div>

            <motion.div
                className='edit-reply'
                onClick={() => optionClick('EDIT_REPLY')}
                key='edit-reply2' initial='hidden' animate='visible' exit='exit' variants={setVariants()}
            >
                <i><MdRebaseEdit /></i>
                <p>{optionsMessageReplyTo ? 'Edit' : 'Add'} Reply</p>
            </motion.div>
        </>
    );
};

export default OptionsEditMenu;