// @flow
/**
 * Copyright (c) 2017, Dirk-Jan Rutten
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";

import schema from "./graphql";
import { SUBSCRIPTION_ENDPOINT } from "./config";

const createSubscriptionServer = (server: any) =>
  new SubscriptionServer(
    {
      schema,
      execute,
      subscribe
    },
    {
      server,
      path: SUBSCRIPTION_ENDPOINT
    }
  );

export default createSubscriptionServer;
