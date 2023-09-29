import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserLock, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { guestSignVariants } from '../config/varitans';

const Profile = () => {
    const { user, enterAsAGuest } = useSelector((store) => store.userStore);

    return (
        <>
            <ProfileContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={guestSignVariants}
            >
                {
                    enterAsAGuest ?
                    <div className='guest'>
                        <i className='icon'>
                            <FaUserLock />
                        </i>
                        <p className='text'>Guest Mode</p>
                    </div> :
                    <div className='user'>
                        <i className='icon'>
                            <FaUser />
                        </i>
                        <p className='text'>{user?.displayName}</p>
                    </div>

                }
            </ProfileContainer>
        </>
    );
};

const ProfileContainer = styled(motion.div)`
    position: absolute;
    top: 1rem;
    left: 2rem;
    width: 2.5rem;
    height: 2.5rem;
    color: var(--normal-color);
    border: solid 1.5px #ffffff14;
    border-radius: 50px;
    box-shadow: var(--normal-shadow);
    backdrop-filter: var(--bold-glass);
    -webkit-backdrop-filter: var(--bold-glass);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    overflow: hidden;
    transition: width 0.4s cubic-bezier(0.53, 0, 0, 0.98), height 0.4s cubic-bezier(0.53, 0, 0, 0.98), border-radius 0.4s 0.4s;

    .guest,
    .user {
        position: absolute;
        top: 0;
        left: 0;
        width: 2.45rem;
        height: 2.45rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .text {
            position: absolute;
            font-size: 0.8rem;
            font-weight: 400;
            margin-left: 10rem;
            white-space: nowrap;
            letter-spacing: 5px;
            opacity: 0;
            transition: margin 0.8s, opacity 0.4s, letter-spacing 1s;
        }

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    &:hover {
        width: 7.5rem;
        /* height: 5rem; */
        border-radius: 50px;

        .guest,
        .user {
            .text {
                margin-left: 6.5rem;
                letter-spacing: 0.5px;
                opacity: 1;
            }
        }
    }

    @media (max-width: 500px) {
        left: 0;
    }
`;

export default Profile;
