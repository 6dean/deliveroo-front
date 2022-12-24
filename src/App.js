import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);
  let [total, setTotal] = useState(0);

  const fetchData = async () => {
    const response = await axios.get(
      "https://deliveroo-back-1jqn.onrender.com/"
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <div className="loading">
      <span class="loader"></span>
    </div>
  ) : (
    <div className="page-element">
      <div className="header-top">
        <div className="header-logo">
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
          <div>
            <img
              className="image-resto"
              src={data.meta.metatags.image}
              alt="subway"
            />
          </div>
          <div className="header-resto">
            <div className="description-div">
              <p className="header-title">{data.header.title}</p>
              <p className="header-cat">Sandwichs · Salades · Options Vegan</p>
              <p className="header-note">
                4.4 Très bien (500+) · 2,50 € de livraison · 10,00 € minimum
              </p>
              <p className="description-resto">{data.meta.metatags.title}</p>
            </div>
          </div>
        </div>
        <div className="banner-sep"></div>
        <div className="listing-cat">
          {data.meta.categories.map((elem, i) => {
            return (
              <div className="style-cat" key={i}>
                {elem.name}
              </div>
            );
          })}
        </div>

        {/* ------MON MAPPING DE JSON------ */}

        <div className="background-categories">
          <div className="diviseur">
            <div>
              {data.meta.categories.map((elem, index) => {
                return (
                  <>
                    <div>
                      <div className="category-p">{elem.name}</div>
                      <div className="categories">
                        {data.items.map((x) => {
                          if (Number(x.categoryId) === Number(elem.id)) {
                            return (
                              <div className="listing">
                                <div
                                  className="prez-menu"
                                  onClick={() => {
                                    const newBasket = [...basket];

                                    if (
                                      newBasket.some(
                                        (item) => item.id === x.id
                                      ) === false
                                    ) {
                                      newBasket.push({
                                        name: x.name,
                                        price: x.price.formatted,
                                        id: x.id,
                                        quantity: 1,
                                        fractional: x.price.fractional,
                                      });
                                      setBasket(newBasket);
                                    } else {
                                      // const newBasket = [...basket];
                                      // newBasket.map((x)=>{})
                                      // setBasket(newBasket);
                                    }

                                    let newTotal = total;
                                    newTotal =
                                      newTotal + x.price.fractional / 100;
                                    setTotal(newTotal);
                                  }}
                                >
                                  <div>
                                    <p className="title-product">{x.name}</p>
                                    <p className="limited-text">
                                      {x.description}
                                    </p>
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
            </div>

            {/* ------PANIER ELEMENT------ */}

            <div className="panier-element">
              <p>MON PANIER</p>
              <div className="panier-list">
                <div className="order-food">
                  {basket.map((elem, index) => {
                    return (
                      <div className="counter-food">
                        <div>
                          <button
                            onClick={() => {
                              if (basket[index].quantity === 0) {
                                basket[index].quantity = 0;
                              } else {
                                const newBasket = [...basket];
                                newBasket[index].quantity--;
                                setBasket(newBasket);
                              }
                              if (total <= 0) {
                                total = 0;
                              } else {
                                let newTotal = total;
                                newTotal = newTotal - elem.fractional / 100;
                                return setTotal(newTotal);
                              }
                            }}
                          >
                            -
                          </button>
                        </div>

                        <div>x{elem.quantity}</div>
                        <button
                          onClick={() => {
                            const newBasket = [...basket];

                            newBasket[index].quantity++;
                            setBasket(newBasket);

                            let newTotal = total;
                            newTotal = newTotal + elem.fractional / 100;
                            return setTotal(newTotal);
                          }}
                        >
                          +
                        </button>
                        {elem.name}
                      </div>
                    );
                  })}
                </div>
                <div>
                  {basket.map((elem) => {
                    return <div>{elem.price}</div>;
                  })}
                </div>
              </div>
              <div className="marging">
                <div className="panier-list">
                  <div
                    className={basket.length === 0 ? "undisplay" : "display"}
                  >
                    frais de livraison
                  </div>
                  <div
                    className={basket.length === 0 ? "undisplay" : "display"}
                  >
                    2.50 €
                  </div>
                </div>
                <div className="panier-list">
                  <div
                    className={basket.length === 0 ? "undisplay" : "display"}
                  >
                    Total
                  </div>
                  <div
                    className={basket.length === 0 ? "undisplay" : "display"}
                  >
                    {Number(total.toFixed(1)) + 2.5} €
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>OK</div>
        <footer>
          <p>DELIVEROO 2022</p>
        </footer>
      </body>
    </div>
  );
}

export default App;
