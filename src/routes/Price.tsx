import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinTickers } from "../api";
import styled from "styled-components";

const PriceTab = styled.div``;

const PriceInfo = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  height: 30vh;
`;

const PriceInfoItem = styled.li`
  display: flex;
  flex-direction: column;
  padding-right: 25px;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: space-around;
  align-items: center;
  width: 48%;
  height: 10vh;
  padding: 10px;
  border-radius: 10px;
`;

const ItemInfo = styled.span`
  font-weight: 400;
  color: ${(props) => props.theme.accentColor};
`;

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 500,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loding Price..."
      ) : (
        <PriceTab>
          <PriceInfo>
            <PriceInfoItem>
              <ItemInfo>Market Cap</ItemInfo>
              <span>${tickersData?.quotes.USD.market_cap}</span>
            </PriceInfoItem>
            <PriceInfoItem>
              <ItemInfo>ATH Price</ItemInfo>
              <span>${tickersData?.quotes.USD.ath_price.toFixed(3)}</span>
            </PriceInfoItem>
            <PriceInfoItem>
              <ItemInfo>Current Price</ItemInfo>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </PriceInfoItem>
            <PriceInfoItem>
              <ItemInfo>Market Cap Change(24h)</ItemInfo>
              <span>{tickersData?.quotes.USD.market_cap_change_24h}&#37;</span>
            </PriceInfoItem>
          </PriceInfo>
        </PriceTab>
      )}
    </div>
  );
}

export default Price;
