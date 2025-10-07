import React, { useState, useMemo, useCallback, lazy, Suspense } from "react";
import {
  Container,
  Typography,
  Alert,
  Box,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import AddIcon from "@mui/icons-material/Add";
import { TradingAccount } from "../types";
import { mockAccounts } from "../mocks";

const AccountCard = lazy(() => import("./AccountCard"));
const CreateAccountModal = lazy(() => import("./CreateAccountModal"));

const Dashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<TradingAccount[]>(mockAccounts);
  /* можно использовать сразу моковые данные,
   но решила что так будет правильнее, 
   с расчетом что будет в дальнейшем запрос API и установка значения с использованием setAccounts*/
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const activeAccountsCount = useMemo(() => {
    return accounts.filter(
      (account) => account.type === "StandardTradingAccount" && account.active
    ).length;
  }, [accounts]);

  const handleAddAccount = useCallback(() => {
    if (activeAccountsCount >= 5) {
      setError("You cannot add more than 5 active accounts");
      return;
    }
    setIsModalOpen(true);
    setError("");
  }, [activeAccountsCount]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const accountsList = useMemo(() => {
    return (
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "flex-start",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
          <Card
            sx={{
              minWidth: 250,
              minHeight: 250,
              mb: 2,
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 4,
              },
            }}
            onClick={handleAddAccount}
          >
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon
                sx={{
                  fontSize: 64,
                  color: "primary.main",
                  mb: 2,
                }}
              />
              <Typography
                variant="h6"
                component="div"
                color="primary.main"
                textAlign="center"
              >
                Add New Account
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }, [accounts, handleAddAccount]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          DASHBOARD
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <Select value="english">
              <MenuItem value="english">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LanguageIcon />
                  English
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Suspense fallback={<CircularProgress />}>
        {accountsList}
        <CreateAccountModal open={isModalOpen} onClose={handleCloseModal} />
      </Suspense>
    </Container>
  );
};

export default Dashboard;
