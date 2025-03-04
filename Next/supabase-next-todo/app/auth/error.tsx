"use client";

import React from "react";
import { BounceLoader } from "react-spinners";

function Error() {
  return (
    <div className="flex flex-col items-center mt-12">
      <div>
        <BounceLoader />
      </div>
      <p className="font-bold mt-5">loading</p>
    </div>
  );
}

export default Error;
