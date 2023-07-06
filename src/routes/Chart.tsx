import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface CharProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: CharProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const mappedChartData = data?.map((price) => ({
    x: price.time_close,
    y: [price.open, price.high, price.low, price.close],
  }));
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[{ data: mappedChartData }] as unknown as number[]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                tools: {},
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            plotOptions: {
              candlestick: {
                wick: {
                  useFillColor: true,
                },
              },
            },
            xaxis: {
              labels: {
                show: false,
                datetimeFormatter: {
                  month: "mmm 'yy",
                },
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
          }}
        />
        // <ApexChart
        //   type="line"
        //   series={[
        //     {
        //       name: "Price",
        //       data: data?.map((price) => Number(price.close)) as number[],
        //     },
        //   ]}
        //   options={{
        //     theme: {
        //       mode: "dark",
        //     },
        //     chart: {
        //       height: 500,
        //       width: 500,
        //       background: "transparent",
        //     },
        //     grid: {
        //       show: false,
        //     },
        //     stroke: {
        //       curve: "smooth",
        //       width: 5,
        //     },
        //     yaxis: {
        //       show: false,
        //     },
        //     xaxis: {
        //       axisBorder: {
        //         show: false,
        //       },
        //       axisTicks: {
        //         show: false,
        //       },
        //       labels: {
        //         show: false,
        //       },
        //       type: "datetime",
        //       categories: data?.map((price) => {
        //         const date = new Date(price.time_close * 1000);
        //         return date.toUTCString();
        //       }),
        //     },
        //     fill: {
        //       type: "gradient",
        //       gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
        //     },
        //     colors: ["#0fbcf9"],
        //   }}
        // />
      )}
    </div>
  );
}

export default Chart;
