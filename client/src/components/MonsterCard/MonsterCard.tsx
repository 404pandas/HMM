import React from "react";
import { useDispatch } from "react-redux";
import { setPlayerA, setPlayerB } from "../../features/game/gameSlice"; // 🔁 Replace with correct path
import type Monster from "../../interfaces/monster"; // 🔁 Replace with correct path
import type Player from "../../interfaces/player";

interface MonsterCardProps {
  monster?: Monster;
  title: string;
  placeholderText?: string;
  playerType: "A" | "B"; // Determines which player to update
}

const MonsterCard: React.FC<MonsterCardProps> = ({
  monster,
  title,
  placeholderText,
  playerType,
}) => {
  const dispatch = useDispatch();

  const handleSelect = () => {
    if (!monster) return;

    const playerData: Player = {
      name: monster.name,
      strength: monster.strength,
      speed: monster.speed,
      description: monster.description,
      rarity: monster.rarity,
      image: monster.image,
    };

    if (playerType === "A") {
      dispatch(setPlayerA(playerData));
    } else {
      dispatch(setPlayerB(playerData));
    }
  };

  return (
    <div
      className="border rounded p-4 w-48 text-center cursor-pointer hover:shadow-lg"
      onClick={handleSelect}
    >
      <h2 className="font-bold">{title}</h2>
      <div className="w-full h-32 border my-2 flex items-center justify-center">
        {monster ? (
          <img src={monster.image} alt={monster.name} className="max-h-full" />
        ) : (
          <span className="text-sm text-gray-500">
            {placeholderText || "Select a monster"}
          </span>
        )}
      </div>
      <p className="font-bold">
        {monster ? monster.name : placeholderText || "No Monster Selected"}
      </p>
    </div>
  );
};

export default MonsterCard;
