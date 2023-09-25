import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ticketState = {
  selectedMovieId: string;
  selectedTheatre: string;
  selectedClass: string;
  selectedTiming: string;
  selectedSeats: string[];
};

const initialState: ticketState = {
  selectedMovieId: "",
  selectedTheatre: "",
  selectedClass: "",
  selectedTiming: "",
  selectedSeats: [],
};

export const ticket = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    setSelectedMovieId: (state, action: PayloadAction<string>) => {
      state.selectedMovieId = action.payload;
      saveSelectedMovieIdToLocalStorage(action.payload);
    },
    setSelectedTheatre: (state, action: PayloadAction<string>) => {
      state.selectedTheatre = action.payload;
      saveSelectedTheatreToLocalStorage(action.payload);
    },
    setSelectedClass: (state, action: PayloadAction<string>) => {
      state.selectedClass = action.payload;
      saveSelectedClassToLocalStorage(action.payload);
    },
    setSelectedTiming: (state, action: PayloadAction<string>) => {
      state.selectedTiming = action.payload;
      saveSelectedTimingToLocalStorage(action.payload);
    },
    selectSeat: (state, action: PayloadAction<string>) => {
      const seat = action.payload;
      if (!state.selectedSeats.includes(seat)) {
        state.selectedSeats.push(seat);
        saveSelectedSeatsToLocalStorage(state.selectedSeats);
      }
    },
    deselectSeat: (state, action: PayloadAction<string>) => {
      const seat = action.payload;
      const index = state.selectedSeats.indexOf(seat);
      if (index !== -1) {
        state.selectedSeats.splice(index, 1);
        saveSelectedSeatsToLocalStorage(state.selectedSeats);
      }
    },
    setSelectedSeats: (state, action: PayloadAction<string[]>) => {
      state.selectedSeats = action.payload;
      saveSelectedSeatsToLocalStorage(action.payload);
    },
  },
});

export const {
  setSelectedMovieId,
  setSelectedTheatre,
  setSelectedClass,
  setSelectedTiming,
  selectSeat,
  deselectSeat,
  setSelectedSeats,
} = ticket.actions;

const saveSelectedMovieIdToLocalStorage = (selectedMovieId: string) => {
  localStorage.setItem("selectedMovieId", selectedMovieId);
};

const saveSelectedTheatreToLocalStorage = (selectedTheatre: string) => {
  localStorage.setItem("selectedTheatre", selectedTheatre);
};

const saveSelectedClassToLocalStorage = (selectedClass: string) => {
  localStorage.setItem("selectedClass", selectedClass);
};

const saveSelectedTimingToLocalStorage = (selectedTiming: string) => {
  localStorage.setItem("selectedTiming", selectedTiming);
};

const saveSelectedSeatsToLocalStorage = (selectedSeats: string[]) => {
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
};

export default ticket.reducer;
