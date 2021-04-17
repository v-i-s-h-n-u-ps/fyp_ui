import React, { useEffect, useState } from "react";
import { get as _get, isEmpty as _isEmpty } from "lodash";

import s from "./index.module.scss";
import PageContainer from "../../_hoc/PageContainer";
import Button from "../../common/Button";
import { login } from "../../../utils/services"

const CommunityHome = (props) => {

    const [condition, setCondition] = useState(false);

    useEffect(() => {
        if (condition) {
            setTimeout(() => {
                setCondition(false)
            }, 4000)
        }
    }, [condition])

    useEffect(() => {
        login({
            "email": "admin@gmail.com",
            "password": "admin"
        }).then( res => {
            console.log(res, "here it iss");
            return res;
        })
    }, [])

    return (
        <PageContainer active={"home"}>
            <button className={s.buttonAdd}>Add Task</button><br></br><br></br>
            <Button
                text="add task"
                type="secondary"
                variant="hollow"
                onClick={() => setCondition(true)}
                loading={condition}
                width={20}
                icon="calendar_filled"
                iconStyle={s.calendarIcon}
            />

            <Button
                text="2nd add task"
                type="cancel"
                variant="block"
            />

            <Button
                text="Message to be sent"
                type="cautious"
                variant="hollow"
                icon="logout"
            />

            <Button
                text="WhatsApp Button"
                type="whatsapp"
                variant="block"
            />

            <button className={s.whatsapp}>
                WhatsApp
            </button>

            <button
                className={s.buttonAdd2}

            >
                Add Task
            </button>
            <br></br><br></br>
            <button className={s.buttonPrimary}>Ok</button><br></br><br></br>
            <button className={s.buttonPrimary2}>
                'Ok'

            </button>
            <br></br><br></br>
            <button className={s.buttonSecondary}>Cancel</button><br></br><br></br>
            <button className={s.buttonSecondary2}>Cancel</button><br></br><br></br>
            <h1 className={s.headingMain}>Dashboard</h1>
            <h2 className={s.headingSub}>Project Details</h2>
            <h3 className={s.textNormal}>This will be the content part</h3>
            <h4 className={s.textSub}>This will be the subtle text part</h4>
            <h4 className={s.textSub2}>This will be the subtle text part</h4>
            <div className={s.cardContainer}>
                <div className={s.header}>
                    <img className={s.round} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
                    <div className={s.name}>
                        <h3>Project Name - Lorem Ipsum</h3>
                        <h5>Project Leader</h5>
                    </div>
                    <h5>Project Location</h5>
                </div>
                <hr color='#ededed'></hr>
                <h6>Project Details</h6>
                <div className={s.content}>
                    <p> Testing out something to type really long to see how this thingy is going to work out if the description is super long</p>
                    <button className={s.buttonSend}>Send Message</button>
                </div>
            </div><br></br><br></br>
            <div className={s.cardContainer2}>
                <div className={s.header2}>
                    <img className={s.round2} src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
                    <div className={s.name2}>
                        <h3>Project Name - Lorem Ipsum</h3>
                        <h5>Project Leader</h5>
                    </div>
                    <h5>Project Location</h5>
                </div>
                <hr color='#ededed'></hr>
                <h6>Project Details</h6>
                <div className={s.content2}>
                    <p> Testing out something to type really long to see how this thingy is going to work out if the description is super long</p>
                    <button className={s.buttonSend2}>Send Message</button>
                </div>
            </div><br></br><br></br>
            <div className={s.forumContainer}>
                <div className={s.forumCard}>
                    <p>Typing something to check out the css for the tags and stuff</p><br></br>
                    <div className={s.tags}>
                        <ul>
                            <li><a href="#">Technology</a></li>
                            <li><a href="#">Culinary</a></li>
                        </ul>
                    </div>
                </div>
            </div><br></br><br></br>
            <div className={s.forumContainer2}>
                <div className={s.forumCard2}>
                    <p>Typing something to check out the css for the tags and stuff</p><br></br>
                    <div className={s.tags2}>
                        <ul>
                            <li><a href="#">Technology</a></li>
                            <li><a href="#">Culinary</a></li>
                        </ul>
                    </div>
                </div>
            </div><br></br><br></br>
            <div className={s.message}>
                <div className={s.messageLight}>
                    <p className={s.messageContent}>This is an awesome message!</p>
                </div>
                <div className={s.messageDark}>
                    <p className={s.messageContent}>I agree that your message is awesome!</p>
                </div>
            </div><br></br><br></br>
            <div className={s.message2}>
                <div className={s.messageLight2}>
                    <p className={s.messageContent2}>This is an awesome message!</p>
                </div>
                <div className={s.messageDark2}>
                    <p className={s.messageContent2}>I agree that your message is awesome!</p>
                </div>
            </div><br></br><br></br>
        </PageContainer>
    );
};

export default (CommunityHome);
