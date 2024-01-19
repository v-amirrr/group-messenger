import React from 'react';
import { useMessageOptions } from '../../hooks/useMessageOptions';
import { useSelect } from '../../hooks/useSelect';
import styled from 'styled-components';

const DeletePopup = ({ popupMessages }) => {
    const { deleteMessage, closePopup } = useMessageOptions();
    const { deleteSelectedMessages } = useSelect();

    const pressEnter = (e) => {
        if (e.key == 'Enter') {
            deleteMessage(popupMessages.id);
        }
    };

    return (
        <>
            <DeletePopupContainer onKeyDown={(e) => pressEnter(e)}>
                <h4>
                    Are you sure you want to delete
                    {' '}
                    {
                        popupMessages.length > 1 ?
                        'these messages' :
                        'this message'
                    }
                    {' '}
                    permanently?
                </h4>
                <div className='buttons'>
                    <button className='cancel' onClick={closePopup}>
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
        }
    }
`;

export default DeletePopup;
