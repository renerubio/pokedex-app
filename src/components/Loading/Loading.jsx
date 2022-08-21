import React from "react";
import { useTranslation } from "react-i18next";

import "./Loading.scss";

export const Loading = () => {
  const [t] = useTranslation("global");
  return (
    <div className="loading-wrapper d-flex flex-column">
      <div className="lds-dual-ring object-none object-left-top">
        <b>{t("loading")}</b>
      </div>
    </div>
  );
};
