import React from 'react';
import { useSelector } from 'react-redux';
import { FaUserLock, FaUser } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { profileVariants } from '../config/varitans';

const Profile = () => {
    const { user, enterAsAGuest } = useSelector((store) => store.userStore);

    return (
        <>
            <ProfileContainer
                initial='hidden'
                animate='visible'
                exit='exit'
                variants={profileVariants}
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

    @media (max-width: 768px) {
        width: 3rem;
        height: 3rem;
        left: 0;

        .guest,
        .user {
            width: 2.8rem;
            height: 2.8rem;

            .text {
                font-size: 1rem;
                margin-left: 18rem;
                letter-spacing: 10px;
            }

            .icon {
                font-size: 1.2rem;
            }
        }

        &:hover {
            width: 10rem;

            .guest,
            .user {
                .text {
                    margin-left: 9rem;
                }
            }
        }
    }
`;

export default Profile;
