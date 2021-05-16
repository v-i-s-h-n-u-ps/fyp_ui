import React, { Component } from 'react';
import Talk from "talkjs";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import _isEmpty from "lodash/isEmpty";

import { selectUserInfo } from "@redux/user/selectors";
import { avatar } from "@constants/defaults";

class TalkJS extends Component {

    constructor(props) {
        super(props);
        this.inbox = undefined;
    }

    componentDidMount() {
        const { selectUserInfo, chatWith } = this.props;
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
                    selected: conversation
                });
                this.inbox.mount(this.container);
            })
            .catch(e => console.error(e));
    }

    componentDidUpdate() {
        const { chatWith, selectUserInfo } = this.props;
        this.inbox = undefined;
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
                const other = new Talk.User({
                    id: chatWith.id || avatar,
                    name: chatWith.name,
                    email: chatWith.email,
                    photoUrl: chatWith.avatar,
                });
                const conversationId = Talk.oneOnOneId(me, other);
                const conversation = window.talkSession.getOrCreateConversation(conversationId);
                conversation.setParticipant(me);
                conversation.setParticipant(other);

                this.inbox = window.talkSession.createInbox({
                    selected: conversation
                });
                this.inbox.mount(this.container);
            })
            .catch(e => console.error(e));
    }

    componentWillUnmount() {
        if (this.inbox) {
            this.inbox.destroy();
        }
    }

    render() {
        return (
            <div style={{ height: "80vh", width: "100%" }} ref={c => this.container = c}>Loading...</div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    selectUserInfo
})

export default connect(mapStateToProps)(TalkJS);
