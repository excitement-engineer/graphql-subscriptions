# Real-time GraphQL API 

This project contains a GraphQL API that allows a user to send posts out into the world for anyone that is listening. The API uses GraphQL subscriptions for sending real-time data to the connected clients.

This project serves as an example for implementing subscriptions in Node.js.

A deployed version of the server can be found [here](https://graphql-message.now.sh/graphiql).

## Getting started

Go to [GraphiQL](https://graphql-message.now.sh/graphiql) and set up a subscription using the GraphQL query below. After executing the subscription, the client will get notified if any new posts are created and will show the resulting data to the user.

```
subscription {
  newPost {
    post {
      from
      subject
      message
    }
  }
}
```

Next, run the following mutation to create a new post: 

```
mutation {
  sendPost(
    from: "GraphQL user", 
    subject: "Hello, world",
    message: "Anyone listening!"
    ) {
      from
      message
      subject 
    }
}
```

This mutation triggers a `newPost` event that triggers the subscription that was set up earlier. The `GraphiQL` pane containing the subscription should now show the post passed in the mutation.

## Running the server

In order to run the server first install the dependencies using the command:

```
yarn
```

Start the server by performing the following commands: 

```
yarn run build
yarn run start
```

> Note, you may get a permission error if your run the start command. In this case run `sudo yarn run start`.
