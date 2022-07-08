import React from 'react';

export default function FloatButtom(props) {
    return (
        <div {...props}>
            <img src={props.src ?? require("../assets/add.svg").default} width={30} />
        </div>
    );
}