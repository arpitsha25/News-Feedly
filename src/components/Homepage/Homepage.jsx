import React, { useEffect, useState } from "react";
import "./Homepage.css";
const Homepage = () => {
  const [searchitem, setsearchitem] = useState("");
  const [newsdata, setnewsdata] = useState([]);
  const [source, setsource] = useState([]);
  const [sourceselect, setsourceselect] = useState([]);
  const [filternewsdata, setfilternewsdata] = useState([]);

  useEffect(() => {
    if (sourceselect.length === 0) {
      setfilternewsdata(newsdata);
    } else {
      setfilternewsdata(
        newsdata.filter((item) => sourceselect.includes(item?.source?.name))
      );
    }
  }, [sourceselect, newsdata]);

  function filtersource(array) {
    const so = array.reduce((source, curr) => {
      if (!source.includes(curr.source.name)) {
        source.push(curr.source.name);
      }
      return source;
    }, []);
    setsource(so);
    // console.log(so);
  }

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
      .then((result) => {
        filtersource(result.data);
        
        setnewsdata(result.data);
      })
      .catch((err) => alert(err));
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
      <div className="homecontainer3 hm3">
        {source.map((i) => {
          return (
            <>
              <span className="spn">
                <input
                  type="checkbox"
                  value={i}
                  onChange={(e) => {
                    if (!sourceselect.includes(e.target.value)) {
                      setsourceselect((prev) => [...prev, e.target.value]);
                    } else {
                      setsourceselect((prev) => {
                        return prev.filter((item) => item !== e.target.value);
                      });
                    }
                  }}
                />
                <p>{i}</p>
              </span>
            </>
          );
        })}

      </div>
      <div className="homecontainer4">
        {filternewsdata.map((item) => {
          return (
            <>
              <p>{item?.title}</p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Homepage;
