import {
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import diagram from "../assets/economygrow.png";
import { StandardTradingAccount } from "../types";

export interface CardConfig {
  header: {
    bgcolor: string;
    color: string;
  };
  getHeaderContent: (account: StandardTradingAccount) => React.ReactNode;
  getBody: (account: StandardTradingAccount) => React.ReactNode;
  getFooter: (
    account: StandardTradingAccount,
    handlers: {
      isActive: boolean;
      onToggleActive: () => void;
      onDeposit: () => void;
    }
  ) => React.ReactNode;
}

export const getCardConfig = (): Record<string, CardConfig> => ({
  inactive: {
    header: { bgcolor: "#9370DB", color: "purple.800" },
    getHeaderContent: (account) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <NotInterestedIcon />
        {account.id}
      </Box>
    ),
    getBody: () => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Deactivated
        </Typography>
      </Box>
    ),
    getFooter: (_, { isActive, onToggleActive }) => (
      <FormControlLabel
        control={
          <Switch
            checked={isActive}
            onChange={onToggleActive}
            color="primary"
          />
        }
        label="Activate"
      />
    ),
  },
  demo: {
    header: { bgcolor: "lightblue", color: "darkblue" },
    getHeaderContent: (account) => `DEMO-${account.id}`,
    getBody: (account) => (
      <>
        <Typography variant="body2" gutterBottom>
          Equity: {account.equity.toFixed(2)}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Leverage: 1:{account.leverage}
        </Typography>
      </>
    ),
    getFooter: () => (
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
          gap: 1,
        }}
      >
        <img src={diagram} alt="Economy growth diagram" width={100} />
      </Box>
    ),
  },
  standard: {
    header: { bgcolor: "#1E90FF", color: "primary.contrastText" },
    getHeaderContent: (account) => account.id,
    getBody: (account) => (
      <>
        <Typography variant="body2" gutterBottom>
          Equity: {account.equity.toFixed(2)}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Leverage: 1:{account.leverage}
        </Typography>
      </>
    ),
    getFooter: (_, { onDeposit }) => (
      <Button variant="contained" color="primary" onClick={onDeposit} fullWidth>
        <AccountBalanceWalletIcon />
      </Button>
    ),
  },
});
