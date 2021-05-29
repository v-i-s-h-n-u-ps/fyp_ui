import React, { useState, useEffect } from "react";
import Router from "next/router";

import s from "./index.module.scss";

const GlobalPageLoader = () => {

  const [hideLoader, setHideLoader] = useState(1);
  const [psuedoHideLoader, setPsuedoHideLoader] = useState(0);

  useEffect(() => {
    let hideTimeout;
    if (psuedoHideLoader) {
      hideTimeout && clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        setPsuedoHideLoader(0);
        setHideLoader(1);
      }, 400)
    }
    return () => {
      hideTimeout && clearTimeout(hideTimeout);
    }
  }, [psuedoHideLoader]);

  Router.events.on('routeChangeStart', (url) => {
    setHideLoader(0);
  });

  Router.events.on('routeChangeComplete', (url) => {
    setPsuedoHideLoader(1);
  });

  Router.events.on('routeChangeError', (url) => {
    setPsuedoHideLoader(1);
  });

  return (
    <div>
      { !hideLoader &&
        <div className={`${s.modal} ${psuedoHideLoader ? s.hide : ''}`}>
          <div className={`${s.dialog}`}>
            <div></div>
          </div>
        </div>
      }
    </div>
  );
}

export default GlobalPageLoader;
