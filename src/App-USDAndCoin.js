import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [value, setValue] = useState(0);
  const [price, setPrice] = useState(0);
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState(0);
  const [inverted, setInverted] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const onChangeSelect = (event) => {
    if (event.target.selectedIndex !== 0) {
      setPrice(event.target.options[event.target.selectedIndex].dataset.price);
      setSymbol(
        event.target.options[event.target.selectedIndex].dataset.symbol
      );
      if (inverted) {
        setValue(
          result /
            event.target.options[event.target.selectedIndex].dataset.price
        );
      } else {
        setResult(
          value / event.target.options[event.target.selectedIndex].dataset.price
        );
      }
      setDisabled(false);
    } else {
      setSymbol("");
      setDisabled(true);
      setResult(0);
    }
  };
  function onChangeUSD(event) {
    setValue(event.target.value);
    setResult(event.target.value / price);
    setInverted(false);
  }
  function onChangeCoin(event) {
    setValue(event.target.value);
    setResult(event.target.value * price);
    setInverted(true);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (disabled && !inverted) {
      setResult(0);
      console.log("disabled and !inverted");
    } else if (disabled && inverted) {
      console.log("disabled and inverted");
      //   setValue(0);
    }
  }, [disabled, inverted]);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChangeSelect}>
          <option>select Coin!</option>
          {coins.map((coin) => (
            <option
              key={coin.id}
              data-price={coin.quotes.USD.price}
              data-symbol={coin.symbol}
            >
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price}
            </option>
          ))}
        </select>
      )}
      <div>
        <input
          type="number"
          onChange={onChangeUSD}
          value={!inverted ? value : result}
        />
        <label> USD</label>
      </div>
      <div>
        <input
          type="number"
          onChange={onChangeCoin}
          value={inverted ? value : result}
          disabled={disabled}
        />
        <label> {symbol}</label>
      </div>
    </div>
  );
}

export default App;
