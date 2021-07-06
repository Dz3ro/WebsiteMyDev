import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import httpHandler from "../httpService/httpHandler";
import MailSendForm from "../MailSendForm.js/MailSendForm";

class PageContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgText: "",
      msgWasSent: false,
      msgWasSentSuccess: false,
      msgPending: true,
    };
  }

  handleMailSend = () => {
    this.setState({ msgWasSent: true });
    httpHandler.sendMsg(
      this.state.msgText,
      this.handleMailSentSuccess,
      this.handleMailSentFail
    );
  };

  handleMailSentSuccess = () => {
    this.setState({
      msgWasSent: true,
      msgWasSentSuccess: true,
      msgPending: false,
    });
  };

  handleMailSentFail = () => {
    this.setState({
      msgWasSent: true,
      msgWasSentSuccess: false,
      msgPending: false,
    });
    console.log("fail mail was not sent");
  };

  handleMsgInput = (msgText) => {
    this.setState({ msgText });
  };
  render() {
    return (
      <div className="pageContactContainer">
        <div className="contactTable">
          <div className="contactTableCell iconContact iconPhone">
            <FontAwesomeIcon icon={faMobile} />
          </div>
          <div className="contactTableCell iconContact iconEmail">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          <a
            href="mailto:anderssonjaroslaw@gmail.com"
            className="contactTableCell contactDetails detailsEmail"
          >
            anderssonjaroslaw@gmail.com
          </a>
          <div className="contactTableCell contactDetails detailsPhone">
            +48 730 137 912
          </div>
        </div>
        <MailSendForm
          mailWasSent={this.state.msgWasSent}
          mailWasSentSuccess={this.state.msgWasSentSuccess}
          onMsgInput={this.handleMsgInput}
          onMailSend={this.handleMailSend}
          mailPending={this.state.msgPending}
        />
      </div>
    );
  }
}

export default PageContact;
