import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { FaUserLock, FaUser, FaUserEdit } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { guestSignVariants } from '../config/varitans';

const Profile = () => {

    const navigate = useNavigate();

    const { user, enterAsAGuest } = useSelector(store => store.userStore);

    const { logout } = useAuth();

    return (
        <>
            <ProfileContainer initial='hidden' animate='visible' exit='exit' variants={guestSignVariants}>
                {
                    enterAsAGuest ?
                    <>
                        <div className='guest'>
                            <i className='icon'><FaUserLock /></i>
                            <p className='text'>Guest Mode</p>
                        </div>
                        <button onClick={logout}>
                            <i><RiUserAddFill /></i>
                            <p>Sign Up</p>
                        </button>
                    </> :
                    <>
                        <div className='user'>
                            <i className='icon'><FaUser /></i>
                            <p className='text'>{user?.displayName}</p>
                        </div>
                        <button onClick={() => navigate("/settings")}>
                            <i><FaUserEdit /></i>
                            <p>Edit Username</p>
                        </button>
                    </>
                }
            </ProfileContainer>
        </>
    );
};

const ProfileContainer = styled(motion.div)`
    position: absolute;
    top: 1.1rem;
    left: 2rem;
    border: var(--border-first);
    border-radius: 25px;
    backdrop-filter: var(--glass-first);
    -webkit-backdrop-filter: var(--glass-first);
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    z-index: 99;
    overflow: hidden;
    box-shadow: var(--shadow-first);
    transition: width .4s cubic-bezier(.53,0,0,.98), height .4s cubic-bezier(.53,0,0,.98);

    .guest, .user {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.5rem;
        height: 2.5rem;
        position: absolute;
        top: 0;
        left: 0;

        .text {
            white-space: nowrap;
            font-size: 0.8rem;
            font-weight: var(--text-boldness-third);
            margin-left: 10rem;
            opacity: 0;
            letter-spacing: 5px;
            position: absolute;
            transition: margin .8s, opacity .4s, letter-spacing 1s;
        }

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    button {
        margin-top: 2.3rem;
        position: absolute;
        transform: scale(0.5);
        opacity: 0;
        transition: transform .6s, opacity .2s;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff08;
        border: var(--border-first);
        border-radius: 25px;
        width: 6.6rem;
        height: 1.8rem;
        cursor: pointer;

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: .2rem;
        }
    }

    &:hover {
        width: 7.5rem;
        height: 5rem;
        transition: width .4s cubic-bezier(.53,0,0,.98), height .4s cubic-bezier(.53,0,0,.98);

        .guest, .user {
            .text{
                margin-left: 6.5rem;
                opacity: 1;
                letter-spacing: .5px;
            }
        }

        button {
            transform: scale(1);
            opacity: 1;
        }
    }

    @media (max-width: 500px) {
        left: 0;
    }
`;

export default Profile;
