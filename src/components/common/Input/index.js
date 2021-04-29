import React, { useState, useRef, useEffect } from "react";

import s from "./index.module.scss";

const Input = props => {

    const {
        handleChange, label, value, onSecondaryAction, onBlur, name, onEnter, placeholder,
        readOnly = false, alwaysFloat = false, showEdit = false, type = "text", focusCallback,
        secondaryText = "Edit", error = false, helperText = "", autoFocus = false, icon = false,
    } = props;

    const [focus, setFocus] = useState(!!value || alwaysFloat);

    const input = useRef();

    const handleBlur = (e) => {
        !!onBlur && onBlur(e);
        if (e.target.value === "") {
            setFocus(!!value || alwaysFloat);
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

    useEffect(() => {
        autoFocus && input.current.focus();
    }, [])

    useEffect(() => {
        setFocus(!!value || alwaysFloat);
    }, [value])

    return (
        <div className={s.input}>
            <div className={s.userInput}>
                {icon && <div className={`${s.icon} ${!!helperText ? s.padding : ''}`}>{icon}</div>}
                <div className={s.flexOne}>
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
            </div>
        </div>
    )
}

export default Input