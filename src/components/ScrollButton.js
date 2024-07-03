import React from 'react';
import { FaArrowDown } from "react-icons/fa";
import styled from 'styled-components';

const ScrollButton = ({ click, arrow }) => {
    return (
        <>
            <ScrollButtonContainer arrow={arrow == 'UP' ? 1 : 0}>
                <div className='icons'>
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
    width: 2.3rem;
    height: 2.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--border);
    border-radius: 50px;
    box-shadow: var(--shadow);
    backdrop-filter: var(--glass);
    cursor: pointer;
    overflow: hidden;
    z-index: 3;
    transition: width .3s cubic-bezier(0.53, 0, 0, 0.98);

    .icons {
        width: 2.3rem;
        height: 2.3rem;
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
    }

    @media (max-width: 768px) {
        right: 3rem;
    }
`;

export default ScrollButton;