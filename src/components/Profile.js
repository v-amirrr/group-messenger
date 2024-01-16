import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserLock } from 'react-icons/fa';
import { TiUser } from 'react-icons/ti';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { profileVariants } from '../config/varitans';

const Profile = () => {
    const { user, enterAsAGuest } = useSelector(store => store.userStore);
    return (
        <>
            <ProfileContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={profileVariants}
                letters={
                    user?.displayName.length < 15 ?
                    user?.displayName.length :
                    enterAsAGuest ? 8 : 15
                }
            >
                {
                    enterAsAGuest ?
                    <div className='guest'>
                        <i className='icon'><FaUserLock /></i>
                        <p className='text'>Guest Mode</p>
                    </div> :
                    <div className='user'>
                        <i className='icon'><TiUser /></i>
                        <p className='text'>{user?.displayName}</p>
                    </div>
                }
            </ProfileContainer>
        </>
    );
};

const ProfileContainer = styled(motion.div)`
    box-sizing: content-box;
    position: absolute;
    top: 1rem;
    left: 8.2rem;
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 2.5px #ffffff20;
    border-radius: 50px;
    color: var(--normal-color);
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    overflow: hidden;
    z-index: 2;
    transition: width 0.3s cubic-bezier(0.53, 0, 0, 0.98),
                height 0.3s cubic-bezier(0.53, 0, 0, 0.98),
                border-radius .2s .6s;

    .guest,
    .user {
        position: absolute;
        top: 0;
        left: 0;
        width: 2.3rem;
        height: 2.3rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .text {
            position: absolute;
            font-size: .8rem;
            font-weight: 400;
            white-space: nowrap;
            letter-spacing: 5px;
            margin-left: 10rem;
            opacity: 0;
            transition: margin 0.8s, opacity 0.4s, letter-spacing 1s;
        }

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .user .icon {
        font-size: 1.3rem;
    }

    &:hover {
        width: ${props => `${props.letters}rem`};
        border-radius: 25px;
        transition: width 0.4s cubic-bezier(0.53, 0, 0, 0.98),
                    height 0.4s cubic-bezier(0.53, 0, 0, 0.98),
                    border-radius .1s;

        .guest,
        .user {
            .text {
                margin-left: ${props => `${props.letters-1.5}rem`};
                letter-spacing: 0.5px;
                opacity: 1;
            }
        }
    }

    @media (max-width: 768px) {
        left: 0;
    }
`;

export default Profile;
