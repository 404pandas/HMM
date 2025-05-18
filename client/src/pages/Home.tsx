import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import MonsterDropdown from "../components/MonsterDropdown/MonsterDropdown";
import MonsterCard from "../components/MonsterCard/MonsterCard";
import { setPlayerB } from "../features/game/gameSlice";
import { GET_MONSTERS } from "../utils/queries";
import type Monster from "../interfaces/monster";
import Battle from "../components/Battle/Battle";

const Home = () => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState("");
  const [opponentId, setOpponentId] = useState("");

  const { loading, error, data } = useQuery(GET_MONSTERS);

  const monsterList = data?.monsters || [];

  const opponentMonster = monsterList.find((m: Monster) => m.id === opponentId);
  const playerMonster = monsterList.find((m: Monster) => m.id === selectedId);

  // Helper to randomize a monster
  const getRandomMonster = () => {
    const randomIndex = Math.floor(Math.random() * monsterList.length);
    return monsterList[randomIndex];
  };

  // Auto-load opponent on first load
  useEffect(() => {
    if (monsterList.length && !opponentId) {
      const opponent = getRandomMonster();
      setOpponentId(opponent.id);
      dispatch(
        setPlayerB({
          name: opponent.name,
          strength: opponent.strength,
          speed: opponent.speed,
          description: opponent.description,
          rarity: opponent.rarity,
          image: opponent.image,
        })
      );
    }
  }, [monsterList, opponentId, dispatch]);

  const handleLoadNewOpponent = () => {
    const newOpponent = getRandomMonster();
    setOpponentId(newOpponent.id);
    dispatch(
      setPlayerB({
        name: newOpponent.name,
        strength: newOpponent.strength,
        speed: newOpponent.speed,
        description: newOpponent.description,
        rarity: newOpponent.rarity,
        image: newOpponent.image,
      })
    );
  };

  if (loading) return <p>Loading monsters...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen game-cont">
      <MonsterDropdown
        monsters={monsterList}
        selectedMonsterId={selectedId}
        onChange={setSelectedId}
        playerType="A"
      />

      <div className="flex justify-center gap-8 mt-4 card-cont">
        <MonsterCard
          monster={playerMonster}
          title="PLAYER"
          placeholderText="Pick your monster"
          playerType="A"
        />
        <MonsterCard
          monster={opponentMonster}
          title="OPPONENT"
          placeholderText="Pick random"
          playerType="B"
        />
      </div>

      <button
        onClick={handleLoadNewOpponent}
        className="mt-4 px-4 py-2 border rounded hover:bg-gray-100"
      >
        Load New Opponent
      </button>

      <Battle />
    </div>
  );
};

export default Home;
