import React from "react";
import { connect } from "react-redux";

import s from "./index.module.scss";
import Button from "../../components/common/Button";

const Access = props => {

    return (
        <div className={s.container}>
            <Button
                text="Hello"
                type="primary"
                variant="block"
                // loading={true}
                icon="logout"
            />
        </div>
    );
};

export default (Access);
