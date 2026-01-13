import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  displayName?: string;
  avatar?: string;
  status: string;
  statistics: any;
}

interface AccountsState {
  accounts: SocialAccount[];
  loading: boolean;
  error: string | null;
}

const initialState: AccountsState = {
  accounts: [],
  loading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<SocialAccount[]>) => {
      state.accounts = action.payload;
      state.loading = false;
    },
    addAccount: (state, action: PayloadAction<SocialAccount>) => {
      state.accounts.push(action.payload);
    },
    updateAccount: (state, action: PayloadAction<SocialAccount>) => {
      const index = state.accounts.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.accounts[index] = action.payload;
      }
    },
    removeAccount: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter((a) => a.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAccounts, addAccount, updateAccount, removeAccount, setLoading, setError } =
  accountsSlice.actions;
export default accountsSlice.reducer;
