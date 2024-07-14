"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Content } from "@google/generative-ai";

type HistoryContextType = {
  conversations: Content[];
  setConversations: Dispatch<SetStateAction<Content[]>>;
  codes: Content[];
  setCodes: Dispatch<SetStateAction<Content[]>>;
};

const initialState: HistoryContextType = {
  conversations: [],
  setConversations: () => {},
  codes: [],
  setCodes: () => {},
};

const HistoryContext = createContext<HistoryContextType>(initialState);

export const HistoryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [conversations, setConversations] = useState<Content[]>([]);
  const [codes, setCodes] = useState<Content[]>([]);

  return (
    <HistoryContext.Provider
      value={{ conversations, setConversations, codes, setCodes }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistoryContext = () => useContext(HistoryContext);
