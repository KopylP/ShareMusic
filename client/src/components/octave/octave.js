import React from "react";
import "./octave.css";

export default function Octave() {
    const whiteKeys = Array.from(Array(7).keys())
        .map(key => {
            return (
                <div className="white-key"></div>
            )
        });
        const blackKeys = Array.from(Array(6).keys())
            .map((key, i) => {
                let translate = `translate(${37.5 + i*50}px, 0px)`;
                var key = <div key={i} className="black-key"
                style={{transform: translate}}/>
                return i == 2 ? null: key;
            })
    return (
        <div className="octave"> 
            {whiteKeys}
            {blackKeys}
        </div>
    );
}