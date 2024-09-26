import { useState } from "react";
import { fetchData } from "./fetchData";
import { endpoints } from "./fetchUrls";
import { initialCoinsData } from "./initialCoinsData";

export const useFetchCoins = () => {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const url = endpoints.getCoinsList;

  function fetchAllCoins() {
    fetchData(url)
      .then((data) => {
        const fetchedCoins = data.data.coins;

        let updatedCoinsData = initialCoinsData.map((coin) => {
          const fetchedCoin = fetchedCoins.find((c) => c.symbol === coin.name);

          if (fetchedCoin && fetchedCoin.depositEnabled === 1) {
            return { ...coin, ...fetchedCoin };
          }
          return null;
        });
        updatedCoinsData = updatedCoinsData.filter((coin) => coin !== null);
        setCoins(updatedCoinsData);
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }

  return { coins, error, fetchAllCoins };
};
