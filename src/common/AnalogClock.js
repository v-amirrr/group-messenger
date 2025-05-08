import React from 'react';
import styled from 'styled-components';

const AnalogClock = ({ time, scale }) => {
    return (
        <>
            <AnalogClockContainer
                data={{
                    scale: scale,
                    hour: time?.hour > 12 ? ((time?.hour - 12) / 12) * 360 + 90 : (time?.hour / 12) * 360 + 90,
                    minute: (time?.minute / 60) * 360 + 90,
                }}
            >
                <div className="outer-clock-face">
                    <div className="marking marking-one"></div>
                    <div className="marking marking-two"></div>
                    <div className="marking marking-three"></div>
                    <div className="marking marking-four"></div>
                </div>
                <div className="inner-clock-face">

                </div>
                <div className='hand hour'></div>
                <div className='hand minute'></div>
            </AnalogClockContainer>
        </>
    );
};

const AnalogClockContainer = styled.div`
    background-color: #222;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    transform: ${props => `scale(${props.data.scale})`};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 .15rem 0 0;

    .outer-clock-face {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .outer-clock-face::after {
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        transform: rotate(90deg)
    }

    .outer-clock-face::after,
    .outer-clock-face::before,
    .outer-clock-face .marking {
        content: '';
        position: absolute;
        width: 2%;
        height: 100%;
        background-color: #555;
        z-index: 0;
        left: 49%;
    }

    .outer-clock-face .marking {
        width: 3%;
    }

    .outer-clock-face .marking.marking-one {
        -webkit-transform: rotate(30deg);
        -moz-transform: rotate(30deg);
        transform: rotate(30deg)
    }

    .outer-clock-face .marking.marking-two {
        -webkit-transform: rotate(60deg);
        -moz-transform: rotate(60deg);
        transform: rotate(60deg)
    }

    .outer-clock-face .marking.marking-three {
        -webkit-transform: rotate(120deg);
        -moz-transform: rotate(120deg);
        transform: rotate(120deg)
    }

    .outer-clock-face .marking.marking-four {
        -webkit-transform: rotate(150deg);
        -moz-transform: rotate(150deg);
        transform: rotate(150deg)
    }

    .inner-clock-face {
        position: absolute;
        width: 80%;
        height: 80%;
        background-color: #222;
        border-radius: 50%;
        z-index: 1;
    }

    .hand {
        position: absolute;
        width: 50%;
        top: 50%;
        right: 50%;
        height: 50px;
        background: #aaa;
        border-radius: 50px;
        transform-origin: 100%;
    }

    .hand.hour {
        width: .2rem;
        height: .03rem;
        z-index: 3;
        transform: ${props => `rotate(${props.data.hour}deg)`};
    }

    .hand.minute {
        width: .3rem;
        height: .03rem;
        z-index: 10;
        transform: ${props => `rotate(${props.data.minute}deg)`};
    }
`;

export default AnalogClock;