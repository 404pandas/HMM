import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type Player from "../../interfaces/player";

interface GameState {
  playerA: Player;
  playerB: Player;
  winner: string;
}

const initialPlayer: Player = {
  name: "",
  strength: 0,
  speed: 0,
  description: "",
  rarity: 0,
  image: "",
};

const initialState: { game: GameState } = {
  game: {
    playerA: { ...initialPlayer },
    playerB: { ...initialPlayer },
    winner: "",
  },
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerA(state, action: PayloadAction<Player>) {
      state.game.playerA = action.payload;
    },
    setPlayerB(state, action: PayloadAction<Player>) {
      state.game.playerB = action.payload;
    },
    setWinner(state, action: PayloadAction<{ winner: string }>) {
      state.game.winner = action.payload.winner;
    },
    resetGame(state) {
      state.game.playerA = { ...initialPlayer };
      state.game.playerB = { ...initialPlayer };
      state.game.winner = "";
    },
  },
});

export const { setPlayerA, setPlayerB, setWinner, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
