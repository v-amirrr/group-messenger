import React from 'react';
import { useChangeUsername } from '../../hooks/useChangeUsername';
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import styled from 'styled-components';

const ChangeUsernamePopup = ({ closePopup, newUsername, oldUsername }) => {
    const { changeUsername } = useChangeUsername();

    const pressEnter = (e) => {
        if (e.key == 'Enter') {
            changeUsername(newUsername);
        }
    };

    return (
        <>
            <ChangeUsernamePopupContainer onKeyDown={(e) => pressEnter(e)}>
                <h4>
                    Are you sure you want to change your username?
                </h4>
                <div className='usernames'>
                    <div className='old-username'>
                        <div><b>CURRENT</b> USERNAME</div>
                        <p>{oldUsername}</p>
                    </div>
                    <i><MdOutlineKeyboardDoubleArrowRight  /></i>
                    <div className='new-username'>
                        <div><b>NEW</b> USERNAME</div>
                        <p>{newUsername}</p>
                    </div>
                </div>
                <div className='buttons'>
                    <button className='cancel' onClick={closePopup}>
                        Cancel
                    </button>
                    <button
                        className='change'
                        onClick={() => changeUsername(newUsername)}
                        autoFocus
                    >
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

    h4 {
        white-space: nowrap;
    }

    .usernames {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff10;
        margin-top: 1.5rem;
        min-width: 16rem;
        padding: .7rem 0;
        border-radius: 50px;

        .old-username, .new-username {
            margin: 0 1rem;
            width: 50%;

            div {
                white-space: nowrap;
                font-size: .5rem;
                color: var(--pale-color);
            }

            p {
                font-size: .8rem;
            }
        }

        i {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
        }
    }

    @media (max-width: 768px) {
        h4 {
            font-size: 0.8rem;
        }
    }
`;

export default ChangeUsernamePopup;