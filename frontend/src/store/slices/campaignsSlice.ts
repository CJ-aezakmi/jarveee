import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Campaign {
  id: string;
  name: string;
  description?: string;
  type: string;
  platform: string;
  status: string;
  statistics: any;
}

interface CampaignsState {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
}

const initialState: CampaignsState = {
  campaigns: [],
  loading: false,
  error: null,
};

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaigns: (state, action: PayloadAction<Campaign[]>) => {
      state.campaigns = action.payload;
      state.loading = false;
    },
    addCampaign: (state, action: PayloadAction<Campaign>) => {
      state.campaigns.push(action.payload);
    },
    updateCampaign: (state, action: PayloadAction<Campaign>) => {
      const index = state.campaigns.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.campaigns[index] = action.payload;
      }
    },
    removeCampaign: (state, action: PayloadAction<string>) => {
      state.campaigns = state.campaigns.filter((c) => c.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCampaigns, addCampaign, updateCampaign, removeCampaign, setLoading } =
  campaignsSlice.actions;
export default campaignsSlice.reducer;
