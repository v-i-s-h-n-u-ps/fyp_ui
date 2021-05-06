import React, { Component } from 'react';
import Talk from "talkjs";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectUserInfo } from "@redux/user/selectors";
import { config } from "@config";

class TalkJS extends Component {

    constructor(props) {
        super(props);
        this.inbox = undefined;
    }

    componentDidMount() {
        const { selectUserInfo } = this.props;
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
                        appId: config.TALKJS_APP_ID,
                        me: me
                    });
                }
                const other = new Talk.User({
                    // id: selectUserInfo.id,
                    // name: selectUserInfo.name,
                    // email: selectUserInfo.email,
                    // photoUrl: selectUserInfo.avatar,
                    id: "54221",
                    name: "Vishnu",
                    email: "admasd@teflon.com",
                    photoUrl: "https://talkjs.com/docs/img/ronald.jpg",
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
