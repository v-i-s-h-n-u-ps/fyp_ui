import React, { useState, useEffect } from "react";
import Head from "next/head";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectThemePreference } from "../../redux/user/selectors";
import { SET_THEME, GET_THEME } from "../../utils/services/user";
import PageLoader from "../loaders/PageLoader";
import GlobalApiToast from "../../utils/snackbar/GlobalApiToast";

const Layout = (props) => {
    const { children, selectThemePreference } = props;

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

    useEffect(() => {
        let _theme = selectThemePreference.theme;
        if (theme !== _theme) {
            SET_THEME(_theme);
            setTheme(_theme);
            document.body.setAttribute('class', _theme);
        }
    }, [selectThemePreference])

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
            <PageLoader />
            <GlobalApiToast />
            {children}
        </>
    );
}

const mapStateToProps = createStructuredSelector({
    selectThemePreference
});

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);