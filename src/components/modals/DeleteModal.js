import React from 'react';
import { useModal } from '../../hooks/useModal';
import { useSelect } from '../../hooks/useSelect';
import styled from 'styled-components';

const DeleteModal = ({ modalMessages }) => {
    const { closeModal } = useModal();
    const { permanentDeleteSelectedMessages } = useSelect();

    const pressEnter = (e) => {
        if (e.key == 'Enter') {
            permanentDeleteSelectedMessages(modalMessages);
        }
    };

    return (
        <>
            <DeleteModalContainer onKeyDown={(e) => pressEnter(e)}>
                <p className='modal-message'>
                    Are you sure you want to delete
                    {
                        modalMessages[0].length > 1 ?
                        ' these messages ' :
                        ' this message '
                    }
                    <b>permanently</b>?
                </p>
                <div className='modal-buttons'>
                    <button className='cancel' onClick={closeModal}>
                        Cancel
                    </button>
                    <button
                        className='delete'
                        onClick={() => permanentDeleteSelectedMessages(modalMessages)}
                        autoFocus
                    >
                        Delete
                    </button>
                </div>
            </DeleteModalContainer>
        </>
    );
};

const DeleteModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: .5rem 0;
`;

export default DeleteModal;
