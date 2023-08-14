import React, { useState } from "react";
import "./Homepage.css";
const Homepage = () => {
  const [searchitem, setsearchitem] = useState("");
  function handlesearch() {
    console.log("search clicked", searchitem);
    fetch("http://localhost:8080/searchnews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchitem: searchitem }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
    setsearchitem("");
  }
  return (
    <div className="homecontainer">
      <div className="homecontainer2">
        <div className="hm hm1">
          <h1>News Feedly</h1>
        </div>
        <div className="hm hm2">
          <input
            type="text"
            placeholder="seach news"
            value={searchitem}
            onChange={(e) => {
              setsearchitem(e.target.value);
            }}
          />
          <button onClick={handlesearch}>SEARCH</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
