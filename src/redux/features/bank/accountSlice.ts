import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BankState {
  banks: { balance: number }[];
}

const initialState: BankState = {
  banks: [],
};

export const accountSlice = createSlice({
  name: "userBanks",
  initialState,
  reducers: {
    addBank: (state, action: PayloadAction<number>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.banks.push({ balance: action.payload });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBank } = accountSlice.actions;

export default accountSlice.reducer;
