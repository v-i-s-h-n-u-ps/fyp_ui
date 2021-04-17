import React, { useState } from "react";
import { connect } from "react-redux";

import s from "./index.module.scss";
import Button from "../../components/common/Button";
import Popup from "../../components/common/Popup";

const Access = props => {

    const [open, setOpen] = useState(false);

    return (
        <div className={s.container}>
            <Button
                text="Hello"
                type="primary"
                variant="block"
                // loading={true}
                icon="logout"
                onClick={() => setOpen(true)}
            />
            <Popup
                open={open} 
                onClose={() => setOpen(false)} 
                position={""}
            />
        </div>
    );
};

export default (Access);
