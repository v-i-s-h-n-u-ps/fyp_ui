import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./index.module.scss";

const EmptyState = props => {

  const { image, message, link, text } = props;

  const router = useRouter();

  const onAction = () => {
    if (typeof link === 'function') {
      link()
    } else {
      router.push(link)
    }
  }

  return (
    <div className={s.emptyContainer}>
      {image && (
        <div className={s.emptyImage}>
          <img src={image} />
        </div>
      )}
      {message}
      {link && text && (
          <p onClick={onAction}>{text}</p>
      )}
    </div>
  )
}

export default EmptyState
