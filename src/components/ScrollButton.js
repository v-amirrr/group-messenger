import React from 'react';
import { FaArrowDown } from "react-icons/fa";
import styled from 'styled-components';

const ScrollButton = ({ click, arrow, newMessage, scrollDown }) => {
    return (
        <>
            <ScrollButtonContainer
                arrow={arrow == 'UP' ? 1 : 0}
                newmessage={newMessage ? 1 : 0}
            >
                <div className='icons'>
                    <div className='new-message' onClick={() => scrollDown('smooth')}>
                        <p>new</p>
                    </div>
                    <i className='arrow' onClick={click}><FaArrowDown /></i>
                </div>
            </ScrollButtonContainer>
        </>
    );
};

const ScrollButtonContainer = styled.button`
    box-sizing: content-box;
    position: absolute;
    top: 1rem;
    right: 11rem;
    width: ${props => props.newmessage ? '4.3rem' : '2.3rem'};
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--border);
    border-radius: 50px;
    box-shadow: var(--shadow);
    backdrop-filter: var(--glass);
    cursor: ${props => props.newmessage ? 'auto' : 'pointer'};
    overflow: hidden;
    z-index: 3;
    transition: width .3s cubic-bezier(0.53, 0, 0, 0.98);

    .icons {
        width: ${props => props.newmessage ? '4.6rem' : '2.3rem'};
        height: ${props => props.newmessage ? '2.4rem' : '2.3rem'};
        display: flex;
        justify-content: center;
        align-items: center;

        .arrow {
            position: absolute;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            width: 2.3rem;
            height: 2.3rem;
            cursor: pointer;
            transform: ${props => props.arrow ? "rotateX(180deg)" : "rotateX(0deg)"};
            transition: transform .5s;
        }

        .new-message {
            position: absolute;
            left: .1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.25rem;
            width: 2.3rem;
            height: 2.3rem;
            opacity: ${props => props.newmessage ? 1 : 0};
            transform: ${props => props.newmessage ? 'scale(1)' : 'scale(0)'};
            cursor: pointer;
            transition: ${props => props.newmessage ? 'opacity .2s .1s, transform .5s' : 'opacity .2s, transform .2s .5s'};

            p {
                font-size: .6rem;
                padding: .1rem .2rem;
                background-color: var(--red);
                border-radius: 50px;
            }
        }
    }

    @media (max-width: 768px) {
        right: 3rem;
    }
`;

export default ScrollButton;