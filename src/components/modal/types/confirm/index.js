import React, { useEffect, useRef } from 'react';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import s from "./index.module.scss";
import ActivityIndicator from "@components/loaders/ActivityIndicator";

const Confirm = props => {

    const { modalData, locale, close } = props

    const {
        primaryText, secondaryText, primaryActionText, secondaryActionText,
        primaryAction, secondaryAction, actionable = false
    } = modalData;

    const action = () => {
        primaryAction();
        if (!actionable) {
            close();
        }
    }

    const usePrevious = (value) => {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prevState = usePrevious(props[actionable]);

    useEffect(() => {
        if (prevState && !props[actionable]) {
            close();
        }
    }, [props[actionable]])

    return (
        <div className={s.mainContainer}>
            <div className={s.primaryText}>{primaryText}</div>
            <div className={s.secondaryText}>{secondaryText}</div>
            <div className={s.ctaContainer}>
                <button
                    className={s.button}
                    onClick={secondaryAction}
                >
                    {secondaryActionText}
                </button>
                <div className={s.separator} />
                <button
                    className={`${s.button} ${s.primary}`}
                    onClick={action}
                    disabled={props[actionable]}
                >
                    {primaryActionText}
                </button>
            </div>
        </div>
    )
}

export default Confirm;
