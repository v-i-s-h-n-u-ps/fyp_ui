import React from "react";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Link from "next/link";

import s from "./index.module.scss";
import { FORUM } from "@constants/routes";

const Forum = props => {

  dayjs.extend(advancedFormat);

  const { item, filterBy } = props;

  const { isMember, isAdmin, _default } = item;

  return (
    <div className={s.participant} key={_default ? undefined : item.userId}>
      <div className={s.titleContainer}>
        <Link href={{ pathname: FORUM, query: { id: item.id } }} >
          <p>{item.name}</p>
        </Link>
        <span>{dayjs(item.createdAt).format("Do MMM, YYYY")}</span>
      </div>
      <div className={s.detailsContainer}>
        <div className={s.createdBy}>
          Role: {isAdmin ? 'Admin' : isMember ? 'Member' : 'Not a Member'}
        </div>
        <div className={s.categoryContainer}>
          {item.categories.map((category, index) => (
            <span 
              key={`category-${index}`} 
              className={s.tag}
              onClick={() => filterBy(category.category)}
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Forum
