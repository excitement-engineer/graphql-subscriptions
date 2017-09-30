// @flow
/**
 * Copyright (c) 2017, Dirk-Jan Rutten
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

import pubsub from "./pubsub";

const NEW_POST_EVENT = "newPost";

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: {
    from: { type: GraphQLString },
    subject: { type: GraphQLString },
    message: { type: GraphQLString }
  }
});

const PostEventType = new GraphQLObjectType({
  name: "PostEvent",
  fields: {
    post: {
      type: PostType
    }
  }
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    viewer: {
      type: GraphQLString,
      resolve: () => "John GraphQL"
    }
  }
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    sendPost: {
      type: PostType,
      args: {
        from: {
          type: GraphQLString
        },
        subject: {
          type: GraphQLString
        },
        message: {
          type: GraphQLString
        }
      },
      description: "Send a post into the world!",
      resolve: (_, args) => {
        const post = {
          from: args.from,
          subject: args.subject,
          message: args.message
        };
        pubsub.publish(NEW_POST_EVENT, {
          newPost: {
            post
          }
        });
        return post;
      }
    }
  }
});

const SubscriptionType = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    newPost: {
      type: PostEventType,
      subscribe: () => pubsub.asyncIterator(NEW_POST_EVENT)
    }
  }
});

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType
});

export default schema;
