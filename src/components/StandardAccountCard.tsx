import React, { memo, useState } from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { StandardTradingAccount } from "../types";
import { getCardConfig } from "./accountCardConfig";

interface StandardAccountCardProps {
  account: StandardTradingAccount;
}

const StandardAccountCard: React.FC<StandardAccountCardProps> = memo(
  ({ account }) => {
    const [isActive, setIsActive] = useState(account.active);

    const handleDeposit = () => {
      console.log("Deposit process started for account:", account.id);
    };

    const handleToggleActive = () => {
      if (!isActive) {
        console.log("Reactivation process started for account:", account.id);
      }
      setIsActive(!isActive);
    };

    const cardConfig = getCardConfig();

    const getCurrentConfig = () => {
      if (!isActive) return cardConfig.inactive;
      if (account.demo) return cardConfig.demo;
      return cardConfig.standard;
    };

    const config = getCurrentConfig();
    const handlers = {
      isActive,
      onToggleActive: handleToggleActive,
      onDeposit: handleDeposit,
    };

    return (
      <Card
        sx={{
          minWidth: 250,
          minHeight: 250,
          mb: 2,
          opacity: isActive ? 1 : 0.7,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Заголовок карточки */}
        <Box
          sx={{
            ...config.header,
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" component="h2" fontWeight="bold">
            {config.getHeaderContent(account)}
          </Typography>
        </Box>

        {/* Тело карточки */}
        <CardContent sx={{ flex: 1 }}>{config.getBody(account)}</CardContent>

        {/* Футер карточки */}
        <Box sx={{ p: 2, pt: 0 }}>{config.getFooter(account, handlers)}</Box>
      </Card>
    );
  }
);

StandardAccountCard.displayName = "StandardAccountCard";

export default StandardAccountCard;
