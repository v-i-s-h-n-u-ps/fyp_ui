import React, { useState, useRef, useEffect } from "react";

import s from "./index.module.scss";

const Input = props => {

    const {
        handleChange, label, value, onSecondaryAction, onBlur, name, onEnter, placeholder,
        readOnly = false, alwaysFloat = false, showEdit = false, type = "text", focusCallback,
        secondaryText = "Edit", error = false, helperText = ""
    } = props;

    const [focus, setFocus] = useState(!!value || alwaysFloat);

    const input = useRef();

    const handleBlur = (e) => {
        !!onBlur && onBlur(e);
        if (e.target.value === "") {
            setFocus(false || alwaysFloat);
        }
    };

    const onChange = e => {
        handleChange(e);
    }

    const onFocus = () => {
        setFocus(true);
        !!focusCallback ? focusCallback() : '';
    }

    const onClick = () => {
        onSecondaryAction();
        input.current.focus();
    }

    const checkEnter = e => {
        (e.key === 'Enter') && !!onEnter && onEnter();
    }

    const activate = () => {
        setFocus(true);
        input.current.focus();
    }

    return (
        <div className={s.input}>
            <div className={`${s.inputArea} ${error ? s.error : ''}`}>
                <label
                    onClick={activate}
                    className={`${s.label} ${focus ? s.active : ""} ${error ? s.error : ''}`}
                >
                    {label}
                </label>
                <input
                    ref={input}
                    className={`${s.floatingLabel}`}
                    readOnly={readOnly}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={label ? alwaysFloat ? placeholder : '' : placeholder}
                    onFocus={onFocus}
                    onBlur={handleBlur}
                    onKeyDown={e => checkEnter(e)}
                />
                {showEdit &&
                    <span
                        className={s.editIcon}
                        onClick={onClick}
                    >
                        {secondaryText}
                    </span>
                }
            </div>
            {!!helperText &&
                <p className={error ? s.error : s.helper}>
                    {helperText}
                </p>
            }
        </div>
    )
}

export default Input