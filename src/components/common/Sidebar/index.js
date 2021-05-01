import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Link from "next/link";
import Router from "next/router";
import _omit from "lodash/omit";

import s from "./index.module.scss";
import { ROOT } from "@constants/routes";
import { sidebarLinks, otherLinks } from "@constants/links";
import {
  selectThemePreference
} from "@edux/user/selectors";
import { themePreference, logout } from "@redux/user/actions";

const Sidebar = (props) => {
  const {
    d__logout, active, isAuth, authUser, isServer,
    d__themePreference, selectThemePreference, userInfo
  } = props;

  const [navOpen, setNavOpen] = useState(false);
  const [theme, setTheme] = useState(selectThemePreference.theme);

  useEffect(() => setTheme(selectThemePreference.theme), [selectThemePreference]);

  useEffect(() => {
    navOpen && (document.body.style.overflow = 'hidden');
    document.getElementById('sideNav').addEventListener('mouseenter', () => {
      document.body.style.overflow = 'hidden'
    });
    document.getElementById('sideNav').addEventListener('mouseleave', () => {
      document.body.style.removeProperty("overflow");
    });
    return () => {
      document.body.style.removeProperty("overflow");
    }
  }, [navOpen]);

  const changeTheme = () => {
    let newTheme = selectThemePreference.theme === 'light' ? 'dark' : 'light';
    d__themePreference(newTheme);
    setTheme(newTheme);
  }

  let sideLinks = sidebarLinks();

  return (
    <>
      <style jsx>{`
                .overlay {
                    opacity:0;
                    visibility: hidden;
                    pointer-events:none;
                }
                .aside {
                    overflow-x: hidden;
                }
                @media (max-width: 1024px){
                    .aside {
                        transform: translateX(-300px);
                    }
                }
            `}</style>
      {!isServer && active && active === 'project' ?
        <div className={`${s.hamburger}`} onClick={() => Router.back()}>
          <i className={`${s.icon} icon-chevron_left`} />
        </div>
        :
        <div className={`${s.hamburger}`} onClick={() => { setNavOpen(!navOpen) }}>
          <i className={`${s.icon} icon-menu ${s.menu}`} />
        </div>
      }

      <aside id={`sideNav`} className={`${s.aside} ${!!navOpen ? s.open : ''} aside`}>
        <nav className={`${s.sidebar}`} >
          <Link href={ROOT} prefetch={false}>
            <a
              onClick={() => { setNavOpen(false) }}
              href={ROOT}
              className={`${s.linkContainer} ${s.logo}`}
            >
              <div className={`${s.shortLogo}`}>
                <img alt={"logo"} src="/images/handyman-icon.png" />
              </div>
              <div className={`${s.link}`}>
                <img
                  alt={"handyman full logo"} c
                  className={`${s.fullLogo} lazyload`}
                  src="/images/infohandyman.png"
                />
              </div>
            </a>
          </Link>
          {sideLinks.map((link, index) => {
            return (
              <Link href={link.path} prefetch={false}>
                <a
                  onClick={() => { setNavOpen(false) }}
                  key={index}
                  className={`${s.linkContainer}`}
                  href={link.path}
                  target={link.sameTab ? '' : '_blank'}
                >
                  <div className={`${s.iconContainer}`}>
                    <i className={`${s.icon} icon-${link.icon} ${s[link.icon]}`} />
                  </div>
                  <div className={`${s.link}`}>{link.text}</div>
                </a>
              </Link>
            )
          })}

          <div
            className={`${s.linkContainer} ${s.theme}`}
            onClick={() => { changeTheme() }}
          >
            <div className={`${s.iconContainer}`}>
              <i className={`${s.icon} icon-theme ${s.theme}`} />
            </div>
            <div className={`${s.link}`}>
              {otherLinks['theme'][theme]['text']}
            </div>
          </div>
          <div onClick={() => { setNavOpen(false); d__logout() }} className={`${s.linkContainer}`} >
            <div className={`${s.iconContainer}`}>
              <i className={`${s.icon} icon-logout ${s.logout}`} />
            </div>
            <div className={`${s.link}`}>Logout</div>
          </div>
        </nav>
      </aside>
      <div className={`${s.overlay} overlay`} onClick={() => { setNavOpen(!navOpen) }}></div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  selectThemePreference,
});

const mapDispatchToProps = (dispatch) => {
  return {
    d__themePreference: (theme) => {
      dispatch(themePreference.set(theme))
    },
    d__logout: () => {
      dispatch(logout.request())
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
