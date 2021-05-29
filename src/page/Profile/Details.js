import React from "react";
import _get from "lodash/get";
import dayjs from "dayjs";
import Link from "next/link";

import s from "./Details.module.scss";
import { FILL_STUDENT_DETAILS } from "@constants/routes";
import Button from "@common/Button";

const Details = props => {

  const { selectStudentInfo } = props;

  return (
    <div className={s.container}>
      <div className={s.header}>
        <p>Personal Information</p>
        <div />
      </div>
      <div className={s.flex}>
        <div className={s.details}>
          <label>Date Of Birth</label>
          <p>{dayjs(_get(selectStudentInfo, 'dateOfBirth')).format("DD MMM, YYYY")}</p>
        </div>
        <div className={s.details}>
          <label>Gender</label>
          <p>{_get(selectStudentInfo, 'gender')}</p>
        </div>
      </div>
      <div className={s.details}>
        <label>University</label>
        <p>
          {_get(selectStudentInfo, 'universityDetails.name')}
          <small>{_get(selectStudentInfo, 'universityDetails.location')}</small>
        </p>
      </div>
      <div className={s.details}>
        <label>Category</label>
        <p>
          {_get(selectStudentInfo, 'categories', []).map(category => (
            <span className={s.tag}>
              {category.categoryName}
            </span>
          ))}
        </p>
      </div>
      <div className={s.header}>
        <p>Social Media Information</p>
        <div />
      </div>
      <div className={s.flex}>
        <div className={s.details}>
          <label>Email</label>
          <p>{_get(selectStudentInfo, 'gmail', '--') || '--'}</p>
        </div>
        <div className={s.details}>
          <label>LinkedIn</label>
          <p>{_get(selectStudentInfo, 'linkedIn', '--') || '--'}</p>
        </div>
      </div>
      <div className={s.flex}>
        <div className={s.details}>
          <label>Twitter</label>
          <p>{_get(selectStudentInfo, 'twitter', '--') || '--'}</p>
        </div>
        <div className={s.details}>
          <label>Facebook</label>
          <p>{_get(selectStudentInfo, 'facebook', '--') || '--'}</p>
        </div>
      </div>
      <Link
        href={{ pathname: FILL_STUDENT_DETAILS, query: { edit: 'true' } }}
        asPath={`${FILL_STUDENT_DETAILS}?edit=true`}
      >
        <Button
          text="edit"
          type="grey"
          variant="hollow"
          width="150px"
        />
      </Link>
    </div>
  )
}

export default Details
