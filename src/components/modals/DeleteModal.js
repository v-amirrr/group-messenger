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
                <h4>
                    Are you sure you want to delete
                    {
                        modalMessages[0].length > 1 ?
                        ' these messages ' :
                        ' this message '
                    }
                    permanently?
                </h4>
                <div className='buttons'>
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

export default DeleteModal;
