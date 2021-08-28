import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addBank } from "../redux/features/bank/accountSlice";
import { RootState } from "../redux/store";

const Accounts = () => {
  const dispatch = useDispatch();
  const banks = useSelector((state: RootState) => state.counter.banks);
  const [value, setValue] = useState(0);

  const handleSubmit = () => {
    dispatch(addBank(value));
  };

  return (
    <div className="account">
      <h1>Accounts</h1>
      <h3>count: {banks.length}</h3>
      <div>
        <div className="inputDiv">
          <p>Balance</p>{" "}
          <input
            type="number"
            //     value={value}
            defaultValue={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </div>
        <button onClick={handleSubmit}>submit</button>
        <div>
          {banks.map((bank, index) => (
            <h4 className="balance" key={index}>
              balance: {bank.balance}
            </h4>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
