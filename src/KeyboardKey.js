import './KeyboardKey.css';
import React from 'react';

function KeyboardKey(props) {
    return (
        <div className="keyboardKey">
            {props.keyName} - {props.note}
        </div>
    )
}

export default KeyboardKey;
