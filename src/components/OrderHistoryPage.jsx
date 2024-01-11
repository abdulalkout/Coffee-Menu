import React from "react";
import * as usersServic from "../utilities/users-service";

function OrderHistoryPage() {
  const handleCheckToken = async () => {
    let exp = await usersServic.checkToken();
    console.log(exp);
    return exp;
  };

  return (
    <>
      <h1>Order History Page</h1>
      <button onClick={handleCheckToken}>Check logIn Experation</button>
    </>
  );
}

export default OrderHistoryPage;
