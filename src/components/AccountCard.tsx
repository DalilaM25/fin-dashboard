import React, { lazy, Suspense, memo } from "react";
import { TradingAccount } from "../types";
import { Card, CircularProgress, Box } from "@mui/material";

const AppAccountCard = lazy(() => import("./AppAccountCard"));
const StandardAccountCard = lazy(() => import("./StandardAccountCard"));

interface AccountCardProps {
  account: TradingAccount;
}

const AccountCard: React.FC<AccountCardProps> = memo(({ account }) => {
  const renderAccountCard = () => {
    switch (account.type) {
      case "AppTradingAccount":
        return <AppAccountCard account={account} />;
      case "StandardTradingAccount":
        return <StandardAccountCard account={account} />;
      default:
        return null;
    }
  };

  return (
    <Suspense
      fallback={
        <Card sx={{ minWidth: 250, minHeight: 250, mb: 2, p: 2 }}>
          <Box display="flex" justifyContent="center">
            <CircularProgress size={24} />
          </Box>
        </Card>
      }
    >
      {renderAccountCard()}
    </Suspense>
  );
});

export default AccountCard;
