import React from "react";
import { useDispatch } from "react-redux";
import { setPlayerA, setPlayerB } from "../../features/game/gameSlice"; // Replace with your actual path
import "./monsterDropdown.css";
import type Monster from "../../interfaces/monster";

interface MonsterDropdownProps {
  monsters: Monster[];
  selectedMonsterId: string;
  onChange: (id: string) => void;
  playerType: "A" | "B"; // NEW
}

const MonsterDropdown: React.FC<MonsterDropdownProps> = ({
  monsters,
  selectedMonsterId,
  onChange,
  playerType,
}) => {
  const dispatch = useDispatch();

  const handleSelect = (id: string) => {
    onChange(id);
    const selected = monsters.find((m) => m.id === id);
    if (!selected) return;

    const playerData = {
      name: selected.name,
      strength: selected.strength,
      speed: selected.speed,
      description: selected.description,
      rarity: selected.rarity,
      image: selected.image,
    };

    // Only update Redux for player A (user-selected)
    if (playerType === "A") {
      dispatch(setPlayerA(playerData));
    }
  };

  return (
    <div className="dropdown-cont">
      <label htmlFor={`monster-select-${playerType}`} className="font-bold">
        PLAYER {playerType}
      </label>
      <select
        id={`monster-select-${playerType}`}
        value={selectedMonsterId}
        onChange={(e) => handleSelect(e.target.value)}
        className="border rounded p-2 mt-1 block w-full"
      >
        {monsters.map((monster) => (
          <option key={monster.id} value={monster.id}>
            {monster.name} +{monster.strength} STR
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonsterDropdown;
