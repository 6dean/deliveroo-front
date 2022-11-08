import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3100/");
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="header-top">
        <div>
          <img
            className="header-img"
            src="https://i.ibb.co/bsdqBh5/logo.png"
            alt=""
          />
        </div>
      </div>
      <header></header>
      <body className="body">
        <div className="bandeau-resto">
          <div className="header-resto">
            <div className="description-div">
              <p className="header-title">{data.header.title}</p>
              <p className="description-resto">
                {data.meta.metatags.descriptionSocial}
              </p>
            </div>

            <div>
              <img
                className="image-resto"
                src={data.meta.metatags.image}
                alt="subway"
              />
            </div>
          </div>
        </div>
        {data.meta.categories.map((elem) => {
          return (
            <>
              <div className="background-categories">
                <div className="category-p">{elem.name}</div>
                <div className="categories">
                  {data.items.map((x) => {
                    if (Number(x.categoryId) === Number(elem.id)) {
                      return (
                        <div className="listing">
                          <div className="prez-menu">
                            <div>
                              <p className="title-product">{x.name}</p>
                              <p className="limited-text">{x.description}</p>
                              <p className="price">{x.price.formatted}</p>
                            </div>
                            <div>
                              {x.image === null ? (
                                <img
                                  src="https://img.icons8.com/emoji/256/cross-mark-button-emoji.png"
                                  width={95}
                                  height={95}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className="food-img"
                                  src={x.image.url}
                                  alt=""
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </>
          );
        })}
        <footer>
          <p>DELIVEROO 2022</p>
        </footer>
      </body>
    </>
  );
}

export default App;
