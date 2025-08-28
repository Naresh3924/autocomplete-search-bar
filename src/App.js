import React, { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [result, setresult] = useState([]);
  const [input, setinput] = useState("");
  const [showresult, setshowresult] = useState(false);
  const [cache, setcache] = useState({});

  const fetchdata = async () => {
    if (!input.trim()) {
      setresult([]);
      return;
    }

    if (cache[input]) {
      setresult(cache[input]);
      return;
    }

    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await data.json();
    setresult(json?.recipes || []);
    setcache((prev) => ({ ...prev, [input]: json?.recipes || [] }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchdata();
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div className="App">
      <h1>Autocomplete Search Bar</h1>
      <div>
        <input
          className="input-box"
          type="text"
          value={input}
          onChange={(e) => setinput(e.target.value)}
          onFocus={() => setshowresult(true)}
          onBlur={() => setTimeout(() => setshowresult(false), 200)}
        />
        <div className="recipe-container">
          {showresult &&
            result.map((r) => (
              <span
                className="recipe-list"
                key={r.id}
                onMouseDown={() => setinput(r.name)} // allows selection
              >
                {r.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
