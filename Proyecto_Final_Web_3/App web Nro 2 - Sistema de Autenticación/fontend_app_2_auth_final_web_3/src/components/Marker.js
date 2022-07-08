import React, { Component } from 'react';
const Marker = (props) => {
    return <div style={{
        cursor: "pointer",
        textAlign: "center",
    }}
        onClick={() => {
            if (!props.onPress) return;
            props.onPress();
        }}>
        {props.contenido}
        {props.children}
    </div>
}
export default Marker;