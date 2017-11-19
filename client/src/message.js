// @flow

import React, { Component } from "react";
import gql from "graphql-tag";
import { client } from "./apollo-client";

const SUBSCRIPTION_QUERY = gql`
  subscription {
    newPost {
      post {
        from
        message
      }
    }
  }
`;

type State = {
  messages: Array<string>
};

class Message extends Component<{}, State> {
  subscription: any;

  constructor() {
    super();

    this.state = {
      messages: []
    };
  }

  componentDidMount = () => {
    client
      .subscribe({
        query: SUBSCRIPTION_QUERY
      })
      .subscribe({
        next: response => {
          const { data } = response;
          if (data && data.newPost) {
            this.setState({
              messages: [...this.state.messages, data.newPost.post.message]
            });
          }
        },
        error(err) {
          console.error("err", err);
        }
      });
  };

  render() {
    return (
      <ul>
        {this.state.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    );
  }
}

export default Message;
