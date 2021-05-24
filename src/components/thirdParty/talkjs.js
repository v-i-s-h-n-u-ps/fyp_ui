import React, { Component } from 'react';
import Talk from "talkjs";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";

import { selectUserInfo } from "@redux/user/selectors";
import { avatar } from "@constants/defaults";
import ActivityIndicator from '@components/loaders/ActivityIndicator';

class TalkJS extends Component {

    constructor(props) {
        super(props);
        this.inbox = undefined;
    }

    setConversation = _ => {
        const { selectUserInfo = {}, chatWith, theme = "light", mode = "single", project = {} } = this.props;
        const otherUser = _isEmpty(chatWith) ? selectUserInfo : chatWith;
        Talk.ready
            .then(() => {
                const me = new Talk.User({
                    id: selectUserInfo.id,
                    name: selectUserInfo.name,
                    email: selectUserInfo.email,
                    photoUrl: selectUserInfo.avatar,
                    role: 'user'
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
                        role: 'user'
                    });
                    const conversationId = Talk.oneOnOneId(me, other);
                    const conversation = window.talkSession.getOrCreateConversation(conversationId);
                    conversation.setParticipant(me, { notify: true });
                    conversation.setParticipant(other, { notify: true });
                    this.inbox = window.talkSession.createInbox({
                        selected: conversation,
                        theme: theme,
                    });
                    this.inbox.mount(this.container);
                }
                if (mode === "group") {
                    const conversation = window.talkSession.getOrCreateConversation(project.id);
                    conversation.setParticipant(me, { notify: true });
                    let others = {}
                    chatWith.forEach(user => {
                        if (user.userId !== selectUserInfo.id) {
                            others[user.userId] = new Talk.User({
                                id: user.userId,
                                name: user.name,
                                email: user.email,
                                photoUrl: user.avatar || avatar,
                                role: 'user',
                                welcomeMessage: "Hey, how can I help?"
                            });
                        }
                    })
                    Object.values(others).forEach(other => conversation.setParticipant(other, { notify: true }))
                    conversation.setAttributes({
                        photoUrl: "https://demo.talkjs.com/img/11.jpg",
                        subject: project.name,
                        showChatHeader: false
                    });
                    this.inbox = window.talkSession.createChatbox(conversation, {
                        theme: theme,
                        chatSubtitleMode: 'participants',
                        chatTitleMode: 'subject',
                        showMobileBackButton: false
                    });
                    this.inbox.mount(this.container);
                }
            })
            .catch(e => console.error(e));
    }

    componentDidMount() {
        const { mode, project, chatWith } = this.props;
        if (mode === 'group' && !_isEmpty(project) && !!chatWith.length) {
            this.setConversation();
        } else if (mode === 'single' || !mode) {
            this.setConversation();
        }
    }

    componentDidUpdate(prevProps) {
        const { chatWith, theme } = this.props;
        if (chatWith !== prevProps.chatWith || theme !== prevProps.theme) {
            this.setConversation();
        }
    }

    componentWillUnmount() {
        if (this.inbox) {
            this.inbox.destroy();
        }
    }

    render() {
        return (
            <div
                style={{ height: "85vh", width: "100%" }}
                ref={c => this.container = c}

            >
                <ActivityIndicator 
                    show={true} 
                    r={20} 
                    strokeWidth={4}
                    cx={"20"}
                    cy={"20"}
                    viewBox="0 0 40 40"
                    height={30}
                    width={30}
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    selectUserInfo
})

export default connect(mapStateToProps)(TalkJS);
