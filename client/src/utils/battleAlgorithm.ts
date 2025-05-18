function rollWithModifier(stat: number): number {
  const roll = Math.floor(Math.random() * 20) + 1;
  const modifier = Math.floor(stat / 10); // adjust scaling as needed
  return roll + modifier;
}

function battle(monsterA: any, monsterB: any): any {
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
