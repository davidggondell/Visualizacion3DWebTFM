import React from "react";
import { MyClustersPage } from "../components/UIComponents/components/myClustersPage/MyClustersPage";
import NoSSR from "react-no-ssr";

export default function myClusters() {
  return (
    <NoSSR>
      <MyClustersPage />
    </NoSSR>
  );
}
