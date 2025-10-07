import React, { memo } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { AppTradingAccount } from "../types";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";

interface AppAccountCardProps {
  account: AppTradingAccount;
}

const AppAccountCard: React.FC<AppAccountCardProps> = memo(({ account }) => {
  const handleOpenApp = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `myapp://account/${account.id}`;
    } else {
      window.open("https://apps.apple.com/app-id", "_blank");
    }
  };

  return (
    <Card
      sx={{
        minWidth: 250,
        minHeight: 250,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        background: "#6495ED",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          App Trading Account
        </Typography>
        <Typography variant="body2">
          Balance: {account.balance.toFixed(2)}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenApp}
          fullWidth
        >
          <MobileFriendlyIcon />
        </Button>
      </Box>
    </Card>
  );
});

AppAccountCard.displayName = "AppAccountCard";

export default AppAccountCard;
