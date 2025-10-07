import { TradingAccount } from "./types";

export const mockAccounts: TradingAccount[] = [
  {
    type: "StandardTradingAccount",
    id: "97444458658",
    active: true,
    demo: true,
    equity: 10000,
    leverage: 200,
    data: [
      { timestamp: Date.now(), value: 5000 },
      { timestamp: Date.now() - 86400000, value: 4800 },
    ],
  },

  {
    type: "StandardTradingAccount",
    id: "76597944449",
    active: true,
    demo: false,
    equity: 5000,
    leverage: 100,
    data: [
      { timestamp: Date.now(), value: 2500 },
      { timestamp: Date.now() - 86400000, value: 2400 },
    ],
  },
  {
    type: "AppTradingAccount",
    id: "app-1",
    balance: 1500,
  },
  {
    type: "StandardTradingAccount",
    id: "34634636346",
    active: false,
    demo: false,
    equity: 0,
    leverage: 50,
    data: [],
  },
];
