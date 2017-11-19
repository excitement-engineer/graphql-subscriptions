// @flow
/**
 * Copyright (c) 2017, Dirk-Jan Rutten
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import express from "express";
import bodyParser from "body-parser";
import url from "url";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import { createServer } from "http";
import cors from "cors";

import schema from "./graphql";
import { SUBSCRIPTION_ENDPOINT, GRAPHQL_ENDPOINT } from "./config";

const app = express();

app.use(cors());

app.use(
  GRAPHQL_ENDPOINT,
  bodyParser.json(),
  graphqlExpress(req => ({
    schema
  }))
);

app.use(
  "/graphiql",
  graphiqlExpress(req => {
    const protocol = req.headers["x-forwarded-proto"] || "http";
    return {
      endpointURL: GRAPHQL_ENDPOINT,
      subscriptionsEndpoint: url.format({
        host: req.get("host"),
        protocol: protocol === "https" ? "wss" : "ws",
        pathname: SUBSCRIPTION_ENDPOINT
      })
    };
  })
);

const server = createServer(app);

export default server;
