import React from "react";
import { useRouter } from "next/router";

import s from "./index.module.scss";
import Ripple from "../../_hoc/Ripple";

const NavigateTo = (props) => {

    const { title, link, children, style = "space-between" } = props;

    const Router = useRouter();

    const back = () => {
        !!link
            ? typeof link === 'function'
                ? link()
                : Router.push(link)
            : Router.back()
    }

    return (
        <>
            <div className={`${s.navigateContainer} navigateContainer`} >
                <div className={`${s.navigateTo}`} onClick={back}>
                    <Ripple >
                        <div className={`${s.navigate}`}>
                            <i className={`${s.icon} icon-arrow_left`} />
                            <div className={`${s.title}`}>{title}</div>
                        </div>
                    </Ripple>
                </div>
                {children}
            </div>
            <style jsx>{`
                .navigateContainer {
                    justify-content: ${style}
                }
            `}</style>
        </>
    )
}

export default NavigateTo;
