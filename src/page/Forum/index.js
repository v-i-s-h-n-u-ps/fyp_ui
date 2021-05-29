import React from "react";
import _get from "lodash/get";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';

import s from "./index.module.scss";
import { FORUMS } from "@constants/routes";
import PageContainer from "@hoc/PageContainer";
import TalkJS from "@components/thirdParty/talkjs";
import NavigateTo from "@common/navigateTo";
import Button from "@common/Button";

const Forum = props => {

  dayjs.extend(advancedFormat);

  const {
    selectUserInfo, selectThemePreference: { theme }, selectForumDetails,
    d__globalModalFlag, d__manageForumMembers
  } = props;

  const { isMember, isAdmin } = selectForumDetails;

  const forum = {
    id: selectForumDetails.id,
    name: selectForumDetails.name
  }

  const update = () => {
    const categories = selectForumDetails.categories.map(item => item.category)
    d__globalModalFlag('forum', {
      id: selectForumDetails.id,
      name: selectForumDetails.name,
      description: selectForumDetails.description,
      categories: categories
    })
  }

  const manage = () => {
    d__manageForumMembers({
      forum: selectForumDetails.id,
      user: selectUserInfo.id,
      type: isMember ? 0 : 1
    })
  }

  return (
    <PageContainer active={"forum"}>
      <NavigateTo title="Back" link={FORUMS}>
        <div className={s.actionButton}>
          {isAdmin
            ? <Button
              text={'Update'}
              width="150px"
              onClick={update}
              variant="hollow"
            />
            : isMember
              ? <Button
                text={'Leave'}
                width="150px"
                onClick={manage}
                variant="hollow"
                type="cautious"
              />
              : <Button
                text={'Join'}
                width="150px"
                onClick={manage}
                variant="hollow"
                type="message"
              />
          }
        </div>
      </NavigateTo>
      <div className={s.forumDetails}>
        <div className={s.detailsContainer}>
          <div className={s.nameContainer}>
            <div>
              <p>{selectForumDetails.name}</p>
              <small>By</small> <span>{selectForumDetails.user_name}</span>
            </div>
            <div className={s.date}>{dayjs(selectForumDetails.createdAt).format("Do MMM, YYYY")}</div>
          </div>
          <div className={s.description}>
            {selectForumDetails.description}
          </div>
        </div>
        <div className={s.talkjs}>
          <div className={s.talkjsMain}>
            <TalkJS
              settings={{
                showFeedHeader: false,
                showMobileBackButton: false,
                showChatHeader: false,
                messageField: {
                  visible: isMember
                }
              }}
              chatWith={_get(selectForumDetails, 'memberList', [])}
              selectUserInfo={selectUserInfo}
              theme={theme}
              themeType='forum-'
              mode="group"
              project={forum}
              type="forum"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default (Forum);
