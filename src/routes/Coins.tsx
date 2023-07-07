import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.listBgColor};
  color: ${(props) => props.theme.textColor};
  font-weight: 500;
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  /* Link component */
  a {
    display: flex;
    padding: 20px;
    align-items: center;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 8px;
`;

const ToggleBtn = styled.span`
  display: flex;
  margin-left: auto;
  cursor: pointer;
  font-size: 20px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  &:hover {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.accentColor};
    transition: color 0.5s ease-in;
  }
`;

const Icon = styled.span``;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {
  toggleDark: () => void;
}

function Coins({ toggleDark }: ICoinsProps) {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  /* 
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  */
  return (
    <Container>
      <Helmet>
        <title>COIN</title>
      </Helmet>
      <Header>
        <Title>COIN</Title>
        <ToggleBtn onClick={toggleDark}>
          <Icon>
            <FontAwesomeIcon icon={faMoon} />
          </Icon>
        </ToggleBtn>
      </Header>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100)?.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                ></Img>
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
