import React, { useEffect, useState } from "react";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const [searchitem, setsearchitem] = useState("");
  const [newsdata, setnewsdata] = useState([]);
  const [source, setsource] = useState([]);
  const [sourceselect, setsourceselect] = useState([]);
  const [filternewsdata, setfilternewsdata] = useState([]);
  // const [tok, settok] = useState('');
  const [isauthenticate, setisauthenticate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let tok = localStorage.getItem("SavedToken")
    // console.log(tok)
    if (!tok) {
      navigate("/");
    } else(
      fetch("http://localhost:8080/authenticate", {
        headers: {
          Authorization: tok,
        },
      })
        .then((res) => res.json())
        .then((rest) => {
          setisauthenticate(rest.success)})
    )
      if (sourceselect.length === 0) {
        setfilternewsdata(newsdata);
      } else {
        setfilternewsdata(
          newsdata.filter((item) => sourceselect.includes(item?.source?.name))
        );
      }
  }, [sourceselect, newsdata, navigate]);


  useEffect(()=>{
    // console.log(isauthenticate)
    if(isauthenticate === 'true') navigate("/")
  },[isauthenticate , navigate])

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
        Authorization: localStorage.getItem("SavedToken"),
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
          <button
            onClick={() => {
              localStorage.removeItem("SavedToken");
              navigate('/')
            }}
          >
            LOGOUT
          </button>
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

      <div className="cardcontainer">
        <div className="cardcontainer2">
          {filternewsdata.map((item) => {
            return (
              <>
                <div className="ct ct1">
                  <div className="dta">
                    <p>
                      <i>source : {item?.source?.name}</i>
                    </p>
                    <h3 className="title">{item?.title}</h3>
                    <p>
                      {" "}
                      <b>Author</b> : {item?.author}
                    </p>
                    <p>
                      <b>Desc : </b>
                      {item?.description}
                    </p>
                    <img src={item?.urlToImage} alt="alt" />
                    <p>
                      {item?.content}
                      <a href={item?.url} target=" ">Read more</a>
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
