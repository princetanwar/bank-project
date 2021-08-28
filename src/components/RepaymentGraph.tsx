import { useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
} from "recharts";

import { RootState } from "../redux/store";

const RepaymentGraph = () => {
  const [data, setData] = useState([]);
  const banks = useSelector((state: RootState) => state.counter.banks);

  const getBankBalance = () => {
    return banks.reduce((pre, curr) => pre + curr.balance, 0);
  };

  const debounce = (func: (amount: number) => void, delay: number) => {
    let debounceTimer: any;
    return (...args: any) => {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleMonthlyPaymentChange = (amount: number) => {
    let bankBalance = getBankBalance();

    const result: any = [];
    //     [{month: 0,balance: 2000}]
    for (let i = 0; i <= 13; i++) {
      result.push({ month: i, balance: bankBalance });
      bankBalance = bankBalance >= amount ? bankBalance - amount : 0;
    }

    setData(result);
  };

  const BetterHandleMonthlyPaymentChange = debounce(
    handleMonthlyPaymentChange,
    300
  );

  return (
    <div>
      <h1>Initial Balance {getBankBalance()}</h1>

      <div className="inputDiv">
        <p>Monthly Payment</p>
        <input
          type="number"
          onChange={(e) =>
            BetterHandleMonthlyPaymentChange(Number(e.target.value))
          }
        />
      </div>
      <div>
        {data.length !== 0 && (
          <>
            <p className="text">Balance of accounts after a number of months</p>
            {banks.length === 0 ? (
              <p>No account </p>
            ) : (
              <LineChart
                width={550}
                data={data}
                height={300}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="balance" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
              </LineChart>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RepaymentGraph;
