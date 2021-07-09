import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class MailSendForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mailWasSent: false,
      mailPending: false,
      mailWasSentSuccess: false,
      iconRot: 0,
      intervalId: 0,
    };
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      const rot = this.state.iconRot;
      const newRot = rot >= 100000 ? 0 : rot + 360;
      this.setState({ iconRot: newRot });
    }, 2000);
    this.setState({ intervalId });
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  componentDidUpdate() {
    const { mailWasSent, mailWasSentSuccess, mailPending } = this.props;
    const sent = this.state.mailWasSent;
    const succ = this.state.mailWasSentSuccess;
    const pend = this.state.mailPending;

    if (
      sent !== mailWasSent ||
      succ !== mailWasSentSuccess ||
      pend !== mailPending
    )
      this.setState({ mailWasSent, mailWasSentSuccess, mailPending });
  }

  render() {
    const { onMsgInput, onMailSend } = this.props;
    const fullForm = (
      <div className="msgForm">
        <h1>Send message</h1>
        <textarea onChange={(e) => onMsgInput(e.target.value)}></textarea>
        <button onClick={() => onMailSend()}>Send</button>
      </div>
    );
    const infoSendingMail = (
      <div className="msgForm">
        <h1>Please wait sending message</h1>
        <FontAwesomeIcon
          icon={faCircleNotch}
          className="loadIcon"
          style={{ transform: `rotate(${this.state.iconRot}deg)` }}
        />
      </div>
    );

    const infoSentSuccessfull = (
      <div className="msgForm">
        <h1 style={{ color: "Chartreuse" }}>Message was sent successfully!</h1>
        <Link to={"/"}>
          <h1> HOME</h1>
        </Link>
      </div>
    );

    const infoSentFail = (
      <div className="msgForm">
        <h1 style={{ color: "red" }}>Something failed while sending</h1>
        <Link to={"/contact"}>
          <h1> TRY AGAIN</h1>
        </Link>
      </div>
    );
    const { mailWasSent, mailWasSentSuccess, mailPending } = this.state;

    if (!mailWasSent) return fullForm;
    if (mailWasSent && mailPending) return infoSendingMail;
    if (mailWasSent && mailWasSentSuccess) return infoSentSuccessfull;
    if (mailWasSent && !mailWasSentSuccess) return infoSentFail;
  }
}

export default MailSendForm;
