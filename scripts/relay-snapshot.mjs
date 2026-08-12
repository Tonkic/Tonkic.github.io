export const emptyRelaySnapshot = () => ({ health: {} });

export const createRelaySnapshot = ({ checkedAt, previous, reachable, detail }) => ({
  health: {
    reachable,
    checkedAt,
    lastSuccessAt: reachable ? checkedAt : previous.health?.lastSuccessAt || null,
    detail,
  },
});

export const assertRelaySnapshot = (snapshot) => {
  const topLevelKeys = Object.keys(snapshot);
  if (topLevelKeys.length !== 1 || topLevelKeys[0] !== "health") {
    throw new Error("Relay snapshot must only expose health");
  }

  const health = snapshot.health;
  if (!health || typeof health.reachable !== "boolean" || typeof health.checkedAt !== "string") {
    throw new Error("Relay snapshot health is invalid");
  }

  if (health.lastSuccessAt !== null && typeof health.lastSuccessAt !== "string") {
    throw new Error("Relay snapshot lastSuccessAt is invalid");
  }

  if (typeof health.detail !== "string") {
    throw new Error("Relay snapshot detail is invalid");
  }
};
