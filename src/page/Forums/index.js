import React from "react";

import s from "./index.module.scss";
import Forum from "@cards/Forum";
import Button from "@common/Button";
import PageContainer from "@hoc/PageContainer";

const Forums = props => {

  const {
    selectForums, selectUserInfo, d__globalModalFlag
  } = props

  return (
    <PageContainer active={"forums"}>
      <div className={s.container}>
        <div className={s.buttonContainer}>
          <Button
            text="Create Forums"
            variant="hollow"
            type="message"
            onClick={() => d__globalModalFlag('forum')}
            width="150px"
          />
        </div>
        <div className={s.forumContainer}>
          {selectForums.map((item, index) => (
            <Forum
              key={`forum-${index}`}
              item={item}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  )
}

export default Forums
