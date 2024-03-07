"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("b9962087-7c47-48bf-90ec-df57eae65376");
  }, []);

  return null;
};
