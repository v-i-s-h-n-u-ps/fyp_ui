import React from "react"; // REMOVE? - needed for jsx
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { get as _get } from "lodash";
import 'lazysizes';
import 'react-toastify/dist/ReactToastify.css';

import "../css/_main.scss";
import { config } from "../config";
import createStore from "../redux/configureStore";
import Layout from "../components/_App/Layout";
import MidGuard from "../components/_App/MidGuard";

class MyApp extends App {

    static async getInitialProps({ Component, ctx }) {
        const { store, isServer } = ctx;
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
        const { isAuth } = this.props;
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
        if (config.env === "production") {
            let isPWA = false;
            if ((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches)
                || (window.navigator && window.navigator.standalone)) {
                isPWA = true;
            }
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
