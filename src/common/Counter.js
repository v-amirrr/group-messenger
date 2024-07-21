import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Counter = ({ num, size }) => {
    const [counterOne, setCounterOne] = useState(num);
    const [counterTwo, setCounterTwo] = useState(num);
    const [changeCounter, setChangeCounter] = useState(false);

    useEffect(() => {
        if (num != 0) {
            setCounterTwo(num);
        }
    }, [num]);

    useEffect(() => {
        setChangeCounter(true);
        setTimeout(() => {
            setCounterOne(num);
            setChangeCounter(false);
        }, 400);
    }, [counterTwo]);

    return (
        <>
            <CounterContainer changecounter={changeCounter ? 1 : 0} size={size}>
                <p className='counter-one'>{counterOne}</p>
                <p className='counter-two'>{counterTwo}</p>
            </CounterContainer>
        </>
    );
};

const CounterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${props => `${props.size}rem`};
    font-weight: 400;

    .counter-one {
        position: absolute;
        top: ${props => props.changecounter ? '2rem' : '50%'};
        opacity: ${props => props.changecounter ? '0' : '1'};
        transform: translate(0, -50%);
        transition: ${props => props.changecounter ? 'top .2s, opacity .2s' : ''};
    }

    .counter-two {
        position: absolute;
        top: ${props => props.changecounter ? '50%' : '-.5rem'};
        opacity: ${props => props.changecounter ? '1' : '0'};
        transform: translate(0, -50%);
        transition: ${props => props.changecounter ? 'top .2s, opacity .2s' : ''};
    }
`;

export default Counter;