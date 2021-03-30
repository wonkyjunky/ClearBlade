import React from "react";
import "clearblade-js-client/lib/mqttws31";
import { ClearBlade } from "clearblade-js-client";
import $ from "jquery";
import { cbCredentials, collectionID } from "./credentials";

const cb = new ClearBlade();

cb.init({
  URI: cbCredentials.URI, // e.g., 'https://platform.clearblade.com'
  systemKey: cbCredentials.systemKey,
  systemSecret: cbCredentials.systemSecret,
  callback: initCallback,
});

function initCallback() {
  var collection = cb.Collection(collectionID);

  fetching(collection);
}

/**
 * Fetching the collection data
 * @param collection
 */
function fetching(collection: any) {
  var query = cb.Query();
  collection.fetch(query, (err: boolean, response: any) => {
    if (err) {
      console.log("Error in Fetching");
    }
    console.log(response);
  });
}

function App() {
  return <div></div>;
}

export default App;
