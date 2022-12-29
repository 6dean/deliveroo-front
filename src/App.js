import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faStar } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);
  let [total, setTotal] = useState(0);

  console.log(basket);

  const fetchData = async () => {
    const response = await axios.get(
      "https://deliveroo-back-1jqn.onrender.com/"
    );
    setData(response.data);
    setIsLoading(false);
    basket.length === 0 && setTotal(0);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculateTotal = Number(total) + 2.5 + 5 + 0.49;

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
                <span className="header-note-plus">
                  {" "}
                  <FontAwesomeIcon icon={faStar} size={"sm"} /> 4.4 Très bien
                </span>{" "}
                (500+) · 2,50 € de livraison · 10,00 € minimum
              </p>
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
                                      const newBasket = [...basket];
                                      // NOT GOOD ////////////////
                                      newBasket[index].quantity++;
                                      setBasket(newBasket);
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

            {basket.length === 0 ? (
              <div className="panier-element-empty">
                <div>
                  <div className="elems-style-empty">
                    <FontAwesomeIcon icon={faBasketShopping} size={"3x"} />
                    <p>VOTRE PANIER EST VIDE</p>
                  </div>
                  <p className="button-buy">Finaliser la commande</p>
                </div>
              </div>
            ) : (
              <div className="panier-element">
                <div className="panier-list">
                  <div className="order-food">
                    {basket.map((elem, i) => {
                      return (
                        <div className="counter-food">
                          {elem.name}
                          <div className="right-side-pa">
                            <button
                              className="button-moreless"
                              onClick={() => {
                                if (basket[i].quantity - 1 < 1) {
                                  let newBasket = [...basket];
                                  let index = newBasket.findIndex(
                                    (item) => item.id === elem.id
                                  );

                                  newBasket.splice(index, 1);
                                  setBasket(newBasket);
                                } else {
                                  const newBasket = [...basket];
                                  newBasket[i].quantity--;
                                  setBasket(newBasket);
                                }
                                if (total <= 0) {
                                  total = 0;
                                } else {
                                  let newTotal = total;
                                  newTotal = newTotal - elem.fractional / 100;
                                  newTotal === 0 && setBasket([]);
                                  return setTotal(newTotal);
                                }
                              }}
                            >
                              -
                            </button>
                            <div className="quantity">{elem.quantity}</div>
                            <button
                              className="button-moreless-plus"
                              onClick={() => {
                                const newBasket = [...basket];

                                newBasket[i].quantity++;
                                setBasket(newBasket);

                                let newTotal = total;
                                newTotal = newTotal + elem.fractional / 100;
                                return setTotal(newTotal);
                              }}
                            >
                              +
                            </button>{" "}
                            <div className="price-right">{elem.price}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="marging">
                  <div className="panier-list">
                    <div
                      className={basket.length === 0 ? "undisplay" : "display"}
                    >
                      frais additionnels
                    </div>
                    <div
                      className={basket.length === 0 ? "undisplay" : "display"}
                    >
                      5.00 €
                    </div>
                  </div>
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
                      frais de service
                    </div>
                    <div
                      className={basket.length === 0 ? "undisplay" : "display"}
                    >
                      0.49 €
                    </div>
                  </div>
                  <div className="panier-list-total">
                    <div
                      className={basket.length === 0 ? "undisplay" : "display"}
                    >
                      <p>Total</p>
                    </div>
                    <div
                      className={basket.length === 0 ? "undisplay" : "display"}
                    >
                      <p>{calculateTotal.toFixed(2)} €</p>
                    </div>
                  </div>
                </div>
                <p
                  className="button-buy-full"
                  onClick={() => {
                    setBasket([]);
                    setTotal(0);
                    alert("Votre commande est en cuisine ! 🍳");
                  }}
                >
                  Finaliser la commande
                </p>
              </div>
            )}
          </div>
        </div>
        <footer>
          <p className="footer-text">DELIVEROO REPLICA 2022 - Rockdean </p>
        </footer>
      </body>
    </div>
  );
}

export default App;
