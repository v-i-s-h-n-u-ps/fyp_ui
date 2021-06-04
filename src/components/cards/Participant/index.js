import Link from "next/link";
import React from "react";

import s from "./index.module.scss";
import { USER_PROFILE } from "@constants/routes";

const Participant = props => {

  const { item, isLeader, onRemove } = props;

  const remove = data => {
    onRemove(data)
  }

  return (
    <div className={s.participant} key={item._default ? undefined : item.userId}>
      <div>
        <img src={item.avatar} />
        <Link href={{ pathname: USER_PROFILE, query: { id: item.userId } }}>
          <p>{item.name}</p>
        </Link>
      </div>
      {isLeader && !item.isLeader && (
        <div className={s.icon}>
          <i
            className={`icon-close`}
            onClick={() => remove({ id: item.userId, name: item.name })}
          />
        </div>
      )}
    </div>
  )
}

export default Participant
