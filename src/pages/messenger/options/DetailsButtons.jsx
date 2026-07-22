import React from 'react';
import { motion } from 'framer-motion';
const framerMotionAttributes = variants => ({ initial: 'hidden', animate: 'visible', exit: 'exit', variants });

const DetailsButtons = ({ time, setVariants }) => {
    return (
        <motion.div className='details' key='time' {...framerMotionAttributes(setVariants())}>
            <div className='clock'>
                <p>
                    <span>{time?.hour}:{time?.minute}</span>
                    <span className='format'>{time?.format}</span>
                </p>
            </div>
            <div className='calendar'>
                <p><span>{time?.year} {time?.month} {time?.day}</span></p>
            </div>
        </motion.div>
    );
};

export default DetailsButtons;