import React from 'react';
import { Link } from 'react-router-dom';
import { IoSettings, IoLogoGithub } from "react-icons/io5";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const messengerHeaderVariants = {
    hidden: { opacity: 0, scaleX: 0, y: -10 },
    visible: { opacity: 1, scaleX: 1, y: 0, transition: { duration: 0.3, type: "spring", stiffness: 100 } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.3 } }
};

const MessengerHeader = () => {
    return (
        <>
            <MessengerHeaderContainer initial='hidden' animate='visible' exit='exit' variants={messengerHeaderVariants}>
                <h1>Group Messenger</h1>
                <div className='header-icons'>
                    <a href='https://github.com/v-amirrr' target="_blank" rel='noopener nereferrer'>
                        <motion.i whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}><IoLogoGithub /></motion.i>
                    </a>
                    <Link to="/settings">
                        <div>
                            <motion.i whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}><IoSettings /></motion.i>
                        </div>
                    </Link>
                </div>
            </MessengerHeaderContainer>
        </>
    );
};

const MessengerHeaderContainer = styled(motion.header)`
    position: absolute;
    top: 1rem;
    min-width: 40%;
    height: 2.6rem;
    backdrop-filter: blur(4px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: #000000cc;
    border-radius: 50px;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 1rem;
        margin: 1rem;
    }

    .header-icons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: .5rem;

        i {
            margin: .2rem;
            font-size: 1.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            padding: .2rem;
            cursor: pointer;
        }
    }

`;

export default MessengerHeader;