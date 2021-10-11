import React, { useState, useEffect, useRef } from 'react';
import "./LandingPage.css";
import NET from 'vanta/dist/vanta.net.min'
import CardWrapper from '../../components/Card-Wrapper/Card-Wrapper';
import BlockChain from '../../components/WhatIsBlockChain/BlockChain';

const LandingPage = () => {
    const [vantaEffect, setVantaEffect] = useState(0)
    const myRef = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: myRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                scale: 1.00,
                scaleMobile: 1.0,
                points: 15
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    return (
        <>
            <div className="landing-page-wrapper">
                <div ref={myRef} className="main-heading">
                    <div className="heading-contents">
                        <span className="heading-welcome-text">
                            Welcome to BlockChain Visualizer
                        </span>
                        <button className="heading-welcome-btn">
                            See Blockchains in action
                        </button>
                    </div>
                </div>
                <CardWrapper/>
                <hr/>                
                <BlockChain/>
            </div>
        </>
    )
}

export default LandingPage
