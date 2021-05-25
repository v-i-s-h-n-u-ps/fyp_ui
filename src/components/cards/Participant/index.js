import React, { useState } from "react";

import s from "./index.module.scss";
import PopUp from "@common/Popup";

const Participant = props => {

    const { item, isLeader, onRemove } = props;

    const [open, setOpen] = useState(false);

    return (
        <div className={s.participant} key={item._default ? undefined : item.userId}>
            <div>
                <img src={item.avatar} />
                <p>{item.name}</p>
            </div>
            {isLeader && (
                <div className={s.icon}>
                    <i
                        className={`icon-triple_vertical_dots`}
                        onClick={() => setOpen(true)}
                    />
                    <PopUp open={open} onClose={() => setOpen(false)}>
                        <div 
                            className={s.popup} 
                            onClick={() => onRemove({ id: item.id })}
                        >
                            Remove
                        </div>
                    </PopUp>
                </div>
            )}
        </div>
    )
}

export default Participant
