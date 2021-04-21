import {React, useState} from "react";

export default function SomeHook() {

  const [count, setCount] = useState(0);



  return (
    <div className="SomeHook">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input type="number" onChange={(e) => {
        setCount(parseInt(event.target.value));
      }} />
      {
        (new Array(count)).fill(1).map((item, index) => {
          return <div kye={index}>{index}</div>
        })
      }
    </div>
  );
}

