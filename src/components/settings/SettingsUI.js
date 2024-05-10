import React from 'react';
import Toggle from '../Toggle';
import { FcGallery } from 'react-icons/fc';
import { RiArrowRightSLine } from 'react-icons/ri';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { backgroundsSettingsVariants } from '../../config/varitans';

const SettingsUI = ({ open, setOpen, setHeight }) => {

    const itemSwitch = () => {
        if (open == 'SETTINGS_UI') {
            setOpen(false);
        } else {
            setOpen('SETTINGS_UI');
            setHeight(10);
        }
    };

    return (
        <>
            <div className='item-header' onClick={itemSwitch}>
                <i className='item-icon'>
                    <FcGallery />
                </i>
                <h4>UI</h4>
                <i className='item-back'>
                    <RiArrowRightSLine />
                </i>
            </div>

            <AnimatePresence>
                {
                    open == 'SETTINGS_UI' ?
                    <UIContainer
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                        variants={backgroundsSettingsVariants}
                    >
                        <div className='toggle-setting' onClick={''}>
                            <p>Glass effect for messages</p>
                            <Toggle
                                toggleHandler={''}
                                toggleValue={''}
                                scale={0.9}
                            />
                        </div>
                        <div className='toggle-setting' onClick={''}>
                            <p>Background blur</p>
                            <Toggle
                                toggleHandler={''}
                                toggleValue={''}
                                scale={0.9}
                            />
                        </div>
                    </UIContainer>
                    : ''
                }
            </AnimatePresence>
        </>
    );
};

const UIContainer = styled(motion.div)`
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 80%;
    margin-top: 5rem;

    .toggle-setting {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: .5rem;
        cursor: pointer;

        p {
            width: 100%;
            font-size: .7rem;
            font-weight: 400;
            text-align: left;
            margin-left: 1rem;
        }

        .toggle {
            position: absolute;
            right: .8rem;
        }
    }
`;

export default SettingsUI;
