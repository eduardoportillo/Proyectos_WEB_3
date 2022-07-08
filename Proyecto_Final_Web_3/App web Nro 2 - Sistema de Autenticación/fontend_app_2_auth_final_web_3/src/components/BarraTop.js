import React from 'react';

const BarraTop = (props) => {
    return <div style={{
        height: 50,
        width: "100%",
        backgroundColor: "#eee",
        justifyContent: "center",
        alignItems: "center",
        display: "flex"
    }}>
        <label>{props.title ?? ""}</label>
    </div>
}
export default BarraTop;
