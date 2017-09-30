// @flow
/**
 * Copyright (c) 2017, Dirk-Jan Rutten
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

let PORT;

if (process.env.NODE_ENV === "production") {
  PORT = 80;
} else {
  PORT = 3000;
}

const SUBSCRIPTION_ENDPOINT = "/subscriptions";
const GRAPHQL_ENDPOINT = "/graphql";

export { PORT, SUBSCRIPTION_ENDPOINT, GRAPHQL_ENDPOINT };
