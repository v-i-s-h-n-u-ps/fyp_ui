import React, { Component } from 'react';
import Talk from "talkjs";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";

import { selectUserInfo } from "@redux/user/selectors";

class TalkJS extends Component {

    constructor(props) {
        super(props);
        this.inbox = undefined;
    }

    setConversation = _ => {
        const { selectUserInfo, chatWith, theme = "light", mode = "single", project = {} } = this.props;
        const otherUser = _isEmpty(chatWith) ? selectUserInfo : chatWith;
        Talk.ready
            .then(() => {
                const me = new Talk.User({
                    id: selectUserInfo.id,
                    name: selectUserInfo.name,
                    email: selectUserInfo.email,
                    photoUrl: selectUserInfo.avatar,
                });
                if (!window.talkSession) {
                    window.talkSession = new Talk.Session({
                        appId: process.env.TALKJS_APP_ID,
                        me: me
                    });
                }
                if (mode === "single") {
                    const other = new Talk.User({
                        id: otherUser.id,
                        name: otherUser.name,
                        email: otherUser.email,
                        photoUrl: otherUser.avatar,
                    });
                    const conversationId = Talk.oneOnOneId(me, other);
                    const conversation = window.talkSession.getOrCreateConversation(conversationId);
                    conversation.setParticipant(me);
                    conversation.setParticipant(other);
                    this.inbox = window.talkSession.createInbox({
                        selected: conversation,
                        theme: theme,
                    });
                }
                if (mode === "group") {
                    const conversation = window.talkSession.getOrCreateConversation(project.id);
                    conversation.setParticipant(me);
                    let others = {}
                    chatWith.forEach(user => {
                        if (user.userId !== selectUserInfo.id) {
                            others[user.userId] = new Talk.User({
                                id: user.userId,
                                name: user.name,
                                email: user.email,
                                photoUrl: user.avatar || avatar,
                            });
                        }
                    })
                    Object.values(others).forEach(other => conversation.setParticipant(other))
                    conversation.setAttributes({
                        photoUrl: "https://demo.talkjs.com/img/11.jpg",
                        subject: project.name,
                        showChatHeader: false
                    });
                    this.inbox = window.talkSession.createInbox({
                        selected: conversation,
                        theme: theme,
                        chatTitleMode: 'subject',
                        showMobileBackButton: false
                    });
                }
                this.inbox.mount(this.container);
            })
            .catch(e => console.error(e));
    }

    componentDidMount() {
        this.setConversation();
    }

    componentDidUpdate(prevProps) {
        const { chatWith, theme } = this.props;
        if (chatWith !== prevProps.chatWith || theme !== prevProps.theme)
            this.setConversation();
    }

    componentWillUnmount() {
        if (this.inbox) {
            this.inbox.destroy();
        }
    }

    render() {
        return (
            <div
                style={{ height: "80vh", width: "100%" }}
                ref={c => this.container = c}
            >
                Loading...
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    selectUserInfo
})

export default connect(mapStateToProps)(TalkJS);
