// import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createWrapper, HYDRATE } from "next-redux-wrapper";
// import { useDispatch } from "react-redux";
// import { ThunkAction } from "redux-thunk";
// import { Action } from "redux";

// // Define the initial state for the data slice
// interface DataState {
//   data: any;
//   isLoading: boolean;
//   error: string | null;
// }

// const initialState: DataState = {
//   data: null,
//   isLoading: false,
//   error: null,
// };

// // Create a slice for data fetching
// const dataSlice = createSlice({
//   name: "data",
//   initialState,
//   reducers: {
//     fetchDataStart(state) {
//       state.isLoading = true;
//       state.error = null;
//     },
//     fetchDataSuccess(state, action: PayloadAction<any>) {
//       state.isLoading = false;
//       state.data = action.payload;
//     },
//     fetchDataFailure(state, action: PayloadAction<string>) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(HYDRATE, (state, action) => {
//       return {
//         ...state,
//         ...action.payload.data,
//       };
//     });
//   },
// });

// export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
//   dataSlice.actions;

// // Thunk for fetching data
// export const fetchData =
//   (): ThunkAction<void, DataState, unknown, Action<string>> =>
//   async (dispatch) => {
//     try {
//       dispatch(fetchDataStart());

//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/posts",
//       );
//       const data = await response.json();

//       dispatch(fetchDataSuccess(data));
//     } catch (error) {
//       dispatch(fetchDataFailure("Failed to fetch data"));
//     }
//   };

// // Create the Redux store
// export const makeStore = () =>
//   configureStore({
//     reducer: {
//       data: dataSlice.reducer,
//     },
//   });

// export const wrapper = createWrapper(makeStore, { debug: true });

// // Define the type for dispatch
// type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
// export const useAppDispatch: () => AppDispatch = useDispatch;
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { useDispatch } from "react-redux";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

// Define the initial state for the data slice
interface DataState {
  data: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: null,
  isLoading: false,
  error: null,
};

// Define the type for the HYDRATE action payload
interface HydrateActionPayload {
  data: DataState;
}

interface HydrateAction extends Action<typeof HYDRATE> {
  payload: HydrateActionPayload;
}

// Create a slice for data fetching
const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchDataStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: HydrateAction) => {
      return {
        ...state,
        ...action.payload.data,
      };
    });
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } =
  dataSlice.actions;

// Thunk for fetching data
export const fetchData =
  (): ThunkAction<void, DataState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      dispatch(fetchDataStart());

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      const data = await response.json();

      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure("Failed to fetch data"));
    }
  };

// Create the Redux store
export const makeStore = () =>
  configureStore({
    reducer: {
      data: dataSlice.reducer,
    },
  });

export const wrapper = createWrapper(makeStore, { debug: true });

// Define the type for dispatch
type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export const useAppDispatch: () => AppDispatch = useDispatch;
