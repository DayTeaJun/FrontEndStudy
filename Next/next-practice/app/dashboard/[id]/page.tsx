import React from "react";

function DashboardDetailPage({ params, searchParams }) {
  console.log(params);
  // http://localhost:3000/dashboard/1?code=123
  // params.id = 1, searchParams.code = 123
  return (
    <div>
      DashboardDetailPage {params.id} code={searchParams.code}{" "}
    </div>
  );
}

export default DashboardDetailPage;
