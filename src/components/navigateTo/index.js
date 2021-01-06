import React from "react";
import Link from "next/link";
import s from "./index.module.scss";

const NavigateTo = (props) =>{
    const {title, link}=props;
    return(
        <div className={`${s.navigateContainer}`}>
            <Link href={link} prefetch={false}>
                <a href={link} className={`${s.navigateTo} gtm-back-home`}>
                    <i className={`${s.icon} icon-arrow_left`}/>
                    <div className={`${s.title}`}>{title}</div>
                </a>
            </Link>
        </div>
    )
}

export default NavigateTo;

