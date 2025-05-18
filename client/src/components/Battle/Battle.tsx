import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWinner } from "../../features/game/gameSlice";
import type Monster from "../../interfaces/monster";
import type { RootState } from "../../features/store";

// Dice roll logic with modifiers
function rollWithModifier(stat: number) {
  const roll = Math.floor(Math.random() * 20) + 1;
  const modifier = Math.floor(stat / 10);
  return roll + modifier;
}

// Battle logic
function battle(monsterA: Monster, monsterB: Monster): Monster {
  let roundsWonA = 0;
  let roundsWonB = 0;

  // Strength round
  const aStrength = rollWithModifier(monsterA.strength);
  const bStrength = rollWithModifier(monsterB.strength);
  if (aStrength > bStrength) roundsWonA++;
  else roundsWonB++;

  // Speed round
  const aSpeed = rollWithModifier(monsterA.speed);
  const bSpeed = rollWithModifier(monsterB.speed);
  if (aSpeed > bSpeed) roundsWonA++;
  else roundsWonB++;

  // Rarity round
  const aRarity = rollWithModifier(monsterA.rarity);
  const bRarity = rollWithModifier(monsterB.rarity);
  if (aRarity > bRarity) roundsWonA++;
  else roundsWonB++;

  return roundsWonA > roundsWonB ? monsterA : monsterB;
}

const Battle = () => {
  const dispatch = useDispatch();
  const { playerA, playerB, winner } = useSelector(
    (state: RootState) => state.game.game
  );

  const handleBattle = () => {
    if (!playerA.name || !playerB.name) {
      alert("Both players must have a monster selected!");
      return;
    }

    const result = battle(playerA, playerB);
    dispatch(setWinner({ winner: result.name }));
  };

  return (
    <div className="text-center mt-6">
      <button
        onClick={handleBattle}
        className="px-6 py-3 border rounded font-bold hover:bg-gray-100"
      >
        BATTLE
      </button>

      {winner && (
        <div className="mt-4 font-bold text-xl text-green-700">
          Winner: {winner}
        </div>
      )}
    </div>
  );
};

export default Battle;
