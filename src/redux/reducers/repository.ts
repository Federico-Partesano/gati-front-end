import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRepository {
  branches: string[] | undefined,
  nameRepo: string | undefined
}

interface RepositoryState {
  repository: IRepository;
}

const initialState = { repository: {branches: undefined, nameRepo: undefined} } as RepositoryState;

const counterSlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    setNameRepo(state: RepositoryState, action: PayloadAction<string>) {
      state.repository.nameRepo = action.payload;
    },
    setBranches(state: RepositoryState, action: PayloadAction<string[]>) {
      state.repository.branches = action.payload;
    },
  },
});

export const { setNameRepo, setBranches } = counterSlice.actions;
export default counterSlice.reducer;
