import React from "react"; // REMOVE? - needed for jsx
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { get as _get } from "lodash";
import nextCookie from 'next-cookies';
import 'lazysizes';
import 'react-toastify/dist/ReactToastify.css';

import "@css/_main.scss";
import { config } from "@config";
import { GET_AUTH } from "@services/auth";
import { university, role, type, category } from "@redux/resources/actions";
import { authentication, themePreference } from "@redux/user/actions";
import { selectThemePreference } from "@redux/user/selectors";
import createStore from "@redux/configureStore";
import Layout from "@components/_App/Layout";
import MidGuard from "@components/_App/MidGuard";

class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        const { store, isServer } = ctx;

        let token = GET_AUTH({ isServer: isServer || false, ctx: ctx || null });
        const { loginTime } = nextCookie(ctx)

        store.dispatch(authentication.request({ token, ctx, loginTime }))

        const { theme } = nextCookie(ctx);
        if (theme && theme !== selectThemePreference.theme) {
            store.dispatch(themePreference.set(theme));
        }

        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps({ ctx });
        }

        return {
            pageProps: pageProps,
            ctxRouter: {
                pathname: ctx.pathname,
                query: ctx.query,
                asPath: ctx.asPath,
            },
        };
    }

    componentDidMount() {
        const { store } = this.props;

        store.dispatch(university.request());
        store.dispatch(role.request());
        store.dispatch(type.request());
        store.dispatch(category.request());

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(registration => {
                    console.log('service worker registration successful')
                })
                .catch(err => {
                    console.error('service worker registration failed', err.message)
                })
        }
    }

    render() {
        const { Component, pageProps, store, ctxRouter, isServer } = this.props;
        return (
            <Provider store={store}>
                <Layout pageProps={pageProps} ctxRouter={ctxRouter}>
                    <MidGuard {...pageProps} isServer={isServer}>
                        <Component {...pageProps} />
                    </MidGuard>
                </Layout>
            </Provider>
        );
    }
}

export default withRedux(createStore)(MyApp);
