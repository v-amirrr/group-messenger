import React, { useState } from 'react';
import { FcPicture } from "react-icons/fc";
import { RiArrowRightSLine } from "react-icons/ri";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SettingsThemes = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <SettingsThemesContainer whileTap={{ scale: 0.8 }} open={open ? 1 : 0}>
                {open ? 
                <div className='theme-open'>
                    <div className='theme'>
                        <img />
                    </div>
                </div> :
                <div className='theme-close'>
                    <i className='list-item-icon'><FcPicture /></i>
                    <p>Themes</p>
                    <i className='list-item-back'><RiArrowRightSLine /></i>
                </div>}
            </SettingsThemesContainer>
        </>
    );
};

const SettingsThemesContainer = styled(motion.div)`
    width: ${props => props.open ? "90%" : "60%"};
    height: ${props => props.open ? "15rem" : "2rem"};
    border: solid 1px #ffffff11;
    padding: 0 .5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 15px;
    cursor: pointer;
    position: relative;
    transition: background .2s, border .2s;

    .theme-close {
        display: flex;
        justify-content: center;
        align-items: center;

        .list-item-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            margin-right: .4rem;
        }
    
        p {
            font-size: .8rem;
            font-weight: 600;
        }
    
        .list-item-back {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.5rem;
            position: absolute;
            right: 0;
            transition: font-size .2s;
        }
    }

    
    &:hover {
        background-color: #ffffff11;
        border: solid 1px #ffffff00;

        .list-item-back {
            font-size: 2rem;
        }
    }
`;

export default SettingsThemes;