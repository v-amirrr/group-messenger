import React from 'react';
import AnalogClock from '../../../common/AnalogClock';
import { FcCalendar } from "react-icons/fc";
import { motion } from 'framer-motion';

const DetailsButtons = ({ time, setVariants }) => {
    return (
        <>
            <motion.div className='details' key='time' initial='hidden' animate='visible' exit='exit' variants={setVariants()}>
                <div className='clock'>
                    <AnalogClock time={time} scale={1} />
                    <p>
                        <span>{time?.hour}:{time?.minute}</span>
                        <span className='format'>{time?.format}</span>
                    </p>
                </div>
                <div className='calendar'>
                    <i><FcCalendar /></i>
                    <p>
                        <span>{time?.year} {time?.month} {time?.day}</span>
                    </p>
                </div>
            </motion.div>
        </>
    );
};

export default DetailsButtons;