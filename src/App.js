import { useState } from "react";

export default function App() {
  const [bill, setbill] = useState(0);
  const [yourPercent, setYourPercent] = useState(0);
  const [friendPercent, setFriendPercent] = useState(0);

  //calculate tip and total bill
  const tip = bill * ((yourPercent + friendPercent) / 2 / 100);
  const totalBill = bill + tip;

  function handleReset() {
    setbill(0);
    setFriendPercent(0);
    setYourPercent(0);
  }

  return (
    <>
      <BillInput bill={bill} onSetBill={setbill} />
      <SelectPercentage percentage={yourPercent} onSelect={setYourPercent}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={friendPercent} onSelect={setFriendPercent}>
        How did your friend like the service?
      </SelectPercentage>

      {bill > 0 && (
        <>
          <BillOutput bill={bill} tip={tip} totalBill={totalBill} />
          <Reset onReset={handleReset} bill={bill} />
        </>
      )}
    </>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <form>
      <label htmlFor="Bill">How much was the Bill?</label>
      <input
        type="text"
        id="Bill"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </form>
  );
}

function SelectPercentage({ percentage, children, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select
        id="Your-percent"
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function BillOutput({ bill, tip, totalBill }) {
  return (
    bill !== 0 && <h1>{`You pay $${totalBill} ($${bill} + $${tip} tip)`}</h1>
  );
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
