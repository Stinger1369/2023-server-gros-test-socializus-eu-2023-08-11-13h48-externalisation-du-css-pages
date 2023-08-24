import React from "react";

import QrCodeScreen from "../pages/QrCodeScreen";
import QrScanScreen from "../pages/QrScanScreen";

const QrNav = 
  [
    {
      link: "Scan",
      to: () => <QrScanScreen />,
    },
    {
      link: "My Qr Code",
      to: () => <QrCodeScreen />,
    },
  ];

export default QrNav;
