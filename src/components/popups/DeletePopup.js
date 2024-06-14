import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useSelect } from '../../hooks/useSelect';
import Message from '../message/Message';
import styled from 'styled-components';

const DeletePopup = ({ popupMessages }) => {
    const { closeModal } = useModal();
    const { deleteSelectedMessages } = useSelect();

    const pressEnter = (e) => {
        if (e.key == 'Enter') {
            deleteSelectedMessages();
        }
    };

    return (
        <>
            <DeletePopupContainer onKeyDown={(e) => pressEnter(e)}>
                <h4>
                    Are you sure you want to delete
                    {' '}
                    {
                        popupMessages[0].length > 1 ?
                        'these messages' :
                        'this message'
                    }
                    {' '}
                    permanently?
                </h4>
                <div className='buttons'>
                    <button className='cancel' onClick={closeModal}>
                        Cancel
                    </button>
                    <button
                        className='delete'
                        onClick={deleteSelectedMessages}
                        autoFocus
                    >
                        Delete
                    </button>
                </div>
            </DeletePopupContainer>
        </>
    );
};

const DeletePopupContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: .5rem 0;

    h4 {
        white-space: nowrap;
    }

    @media (max-width: 768px) {
        h4 {
            font-size: 0.8rem;
            white-space: normal;
        }
    }
`;

export default DeletePopup;
