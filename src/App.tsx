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
  let collection = cb.Collection(collectionID);
}

/**
 * Delete selected item
 * @param collection
 * @param task
 */
function deleteItem(collection: any, task: string) {
  let query = cb.Query().equalTo("task", "5");

  collection.remove(query, async (err: boolean, response: any) => {
    if (err) {
      console.log("error in deleting item");
      return;
    }
    await console.log("delete succeed");
    fetching(collection);
  });
}

/**
 * adding item the the collection
 * @param collection
 */

function addItem(collection: any) {
  collection.create(
    { done: false, task: "5" },
    async (err: boolean, response: any) => {
      if (err) {
        console.log("error in adding item");
      }
      await console.log("adding succeed");
      fetching(collection);
    }
  );
}

/**
 * Fetching the collection data
 * @param collection
 */
function fetching(collection: any) {
  $("#hello").html("");
  let query = cb.Query();
  collection.fetch(query, (err: boolean, response: any) => {
    if (err) {
      console.log("Error in Fetching");
    }
    console.log(response);
    for (let i = 0; i < response.length; i++) {
      $("#hello").append(`<span>${response[i].data.task}</span><br/>`);
    }
  });
}

function App() {
  return (
    <div>
      <span id="hello"></span>
    </div>
  );
}

export default App;
