import React, { useRef } from "react";

import s from "./index.module.scss";
import RenderIfTrue from "../../_hoc/RenderIfTrue";
import onClickOutside from "../../../hooks/onClickOutside";

const Popup = props => {

    const {
        open, onClose, children, position = { x: 10, y: 30 },
        align = "topRight", showClose=false
    } = props;

    const contentRef = useRef()

    onClickOutside(contentRef, onClose);

    return (
        <RenderIfTrue condition={open}>
            <div className={s.overlay} />
            <div className={`${s.popUpContainer} ${align}`}>
                <div className={s.wrapper}>
                    {showClose && 
                        <i className={`icon-close ${s.iconStyle}`} onClick={onClose} />
                    }
                    <div className={s.popUpMain} ref={contentRef}>
                        {children}
                    </div>
                </div>
            </div>
            <style jsx>{`
                @media screen and (min-width: 641px) {
                    .topRight {
                        right: ${position.x + "px"};
                        top: ${position.y + "px"};
                    }
                    .topLeft {
                        left: ${position.x + "px"};
                        top: ${position.y + "px"};
                    }
                }
            `}</style>
        </RenderIfTrue>
    )
}

export default Popup;
