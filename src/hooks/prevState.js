import { useEffect, useRef } from "react";

const prevState = value => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export default prevState
