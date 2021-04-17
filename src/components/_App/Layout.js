import React, { useState, useEffect } from "react";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import GlobalPageLoader from "../loader/PageLoader";
import GlobalApiToast from "../../utils/snackbar/GlobalApiToast";

const Layout = (props) => {
    const { children } = props;

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        let _theme = theme;
        let themeChange;
        let themeChangeFunction;
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                _theme = "dark"
            }
            themeChange = window.matchMedia('(prefers-color-scheme: light)');
            themeChangeFunction = (e) => {
                if (e.matches) {
                    _theme = 'light';
                } else {
                    _theme = 'dark';
                }
                setTheme(_theme);
                document.body.setAttribute('class', _theme);
            }
            themeChange.addEventListener && 
                themeChange.addEventListener('change', (e) => themeChangeFunction(e));
        }
        return (() => {
            themeChange && 
            themeChange.removeEventListener && 
            themeChange.removeEventListener('change', e => themeChangeFunction(e));
        })
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="msapplication-TileColor" content={theme === 'dark' ? '#000000' : '#FFFFFF'} />
                <meta name="theme-color" content={theme === 'dark' ? '#000000' : '#FFFFFF'} />
                <meta name="google" content="notranslate" />
                <link rel="preload" href={"/fonts/icomoon.woff"} as="font" type="font/woff" crossOrigin="anonymous" />
            </Head>
            <GlobalPageLoader />
            <GlobalApiToast />
            {children}
        </>
    );
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);