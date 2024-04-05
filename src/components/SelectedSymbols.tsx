import { useEffect, useState } from 'react';
import { Symbol } from '../interfaces/Symbols';


function SelectedSymbols({ symbols }: { symbols: string[] }) {
  const [updates, setUpdates] = useState<Symbol[]>([]);

  useEffect(() => {

   // const streamParams = symbols.map(symbol => `${symbol.toLowerCase()}@aggTrade`).join('/');
   // const wsUrl = `wss://data-stream.binance.com/stream?streams=${streamParams}`;
   // const ws = new WebSocket(wsUrl);
    
   const ws = new WebSocket(`wss://data-stream.binance.com/stream?streams=btcusdt@aggTrade/ethbtc@aggTrade`);
    ws.onopen = () => {
      const dataToSend = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
      ws.send(dataToSend);
    };
    ws.onmessage = event => {
      if (event !== null) {
        console.log(event);
        const data = JSON.parse(event.data);
        const symbol = data.data.s;
        const lastPrice = data.data.a;
        const bestBidPrice = data.data.p;
        const bestAskPrice = data.data.q;
        const priceChangePercent = data.data.p;
        const update: Symbol = { symbol, lastPrice, bestBidPrice, bestAskPrice, priceChangePercent };
        const symbolExists = updates.some(item => item.symbol === symbol);
        if (!symbolExists) {
          setUpdates(prevUpdates => [...prevUpdates, update]);
        }
      }
    };


  }, [symbols]);

  return (
    <table>
      <thead >
        <tr>
          <th>Symbol</th>
          <th>Last Price</th>
          <th>Brid Price</th>
          <th>Ask Price</th>
          <th>Change Price</th>
        </tr>
      </thead>
      <tbody>
        {updates.map((item: any, index: number) => (
          <tr key={index}>
            <td>{item?.symbol}</td>
            <td>{item?.lastPrice}</td>
            <td>{item?.bestBidPrice}</td>
            <td>{item?.bestAskPrice}</td>
            <td>{item?.priceChangePercent}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SelectedSymbols;




