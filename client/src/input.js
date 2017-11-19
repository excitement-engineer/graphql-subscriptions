// @flow

import React, { Component } from "react";
import gql from "graphql-tag";

import { client } from "./apollo-client";

const ADD_MESSAGE_MUTATION = gql`
  mutation message($message: String) {
    sendPost(message: $message) {
      from
      message
      subject
    }
  }
`;

type State = {
  message: string
};

export default class Input extends Component<{}, State> {
  constructor() {
    super();

    this.state = {
      message: ""
    };
  }

  updateMessage = (event: any) => {
    this.setState({ message: event.target.value });
  };

  onPressKey = (event: any) => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  sendMessage = async () => {
    const { message } = this.state;

    if (!message) {
      return;
    }
    try {
      await client.mutate({
        mutation: ADD_MESSAGE_MUTATION,
        variables: {
          message
        }
      });

      this.setState({
        message: ""
      });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div>
        <input
          value={this.state.message}
          onKeyDown={this.onPressKey}
          onChange={this.updateMessage}
        />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}
