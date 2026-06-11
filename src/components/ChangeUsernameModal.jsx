import React from 'react';
import { useUser } from '../hooks/useUser';
import { MdKeyboardArrowRight  } from "react-icons/md";
import styled from 'styled-components';

const ChangeUsernamePopup = ({ closePopup, newUsername, oldUsername }) => {
    const { changeUsername } = useUser();

    const pressEnter = (e) => {
        if (e.key == 'Enter') {
            changeUsername(newUsername);
        }
    };

    return (
        <>
            <ChangeUsernamePopupContainer onKeyDown={(e) => pressEnter(e)}>
                <p className='modal-message'>Are you sure you want to change your username?</p>
                <div className='usernames'>
                    <div className='old-username'>
                        <div><b>CURRENT</b> USERNAME</div>
                        <p>{oldUsername}</p>
                    </div>
                    <div className='icons'>
                        <i><MdKeyboardArrowRight /></i>
                        <i><MdKeyboardArrowRight /></i>
                    </div>
                    <div className='new-username'>
                        <div><b>NEW</b> USERNAME</div>
                        <p>{newUsername}</p>
                    </div>
                </div>
                <div className='modal-buttons'>
                    <button className='cancel' onClick={closePopup}>
                        Cancel
                    </button>
                    <button className='change' onClick={() => changeUsername(newUsername)} autoFocus>
                        Change
                    </button>
                </div>
            </ChangeUsernamePopupContainer>
        </>
    );
};

const ChangeUsernamePopupContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: .5rem 0;

    .usernames {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--bg);
        margin-top: 1.5rem;
        min-width: 16rem;
        padding: .7rem 0;
        border-radius: 20px;

        .old-username, .new-username {
            margin: 0 1rem;
            width: 50%;

            div {
                white-space: nowrap;
                font-size: .5rem;
                color: var(--grey);
            }

            p {
                font-size: .8rem;
            }
        }

        .icons {
            position: absolute;
            width: 1rem;
            height: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;

            i {
                position: absolute;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                margin-left: -.4rem;
                opacity: 0;

                &:nth-child(1) {
                    animation: icons-animation 1.2s ease-in-out infinite;
                }

                &:nth-child(2) {
                    animation: icons-animation 1.2s ease-in-out .65s infinite;
                }
            }
        }
    }

    @keyframes icons-animation {
        0% {
            margin-left: -.4rem;
            opacity: 0;
            transform: scale(0.9);
        }
        30% {
            opacity: 1;
            transform: scale(1);
        }
        70% {
            opacity: 0.8;
            transform: scale(1);
        }
        100% {
            margin-left: .7rem;
            opacity: 0;
            transform: scale(0.9);
        }
    }
`;

export default ChangeUsernamePopup;