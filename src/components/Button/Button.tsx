import React, { FC } from 'react';
import "./Button.scss";

interface IButton {
theme: "primary" | "secondary",
onClick: () => void;
label: string
}

const Button: FC<IButton> = ({theme, onClick, label}) => {

return (
    <div className='custom-button' onClick={() => onClick()}>{label}</div>
)
};

export default Button;