import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { assertRelaySnapshot, createRelaySnapshot } from "./relay-snapshot.mjs";

test("successful probes advance lastSuccessAt", () => {
  const snapshot = createRelaySnapshot({
    checkedAt: "2026-08-12T00:00:00.000Z",
    previous: { health: { lastSuccessAt: "2026-08-11T00:00:00.000Z" } },
    reachable: true,
    detail: "ok",
  });

  assert.equal(snapshot.health.lastSuccessAt, snapshot.health.checkedAt);
  assert.doesNotThrow(() => assertRelaySnapshot(snapshot));
});

test("failed probes preserve the previous success time", () => {
  const snapshot = createRelaySnapshot({
    checkedAt: "2026-08-12T00:00:00.000Z",
    previous: { health: { lastSuccessAt: "2026-08-11T00:00:00.000Z" } },
    reachable: false,
    detail: "timeout",
  });

  assert.equal(snapshot.health.lastSuccessAt, "2026-08-11T00:00:00.000Z");
});

test("committed snapshot exposes health only", async () => {
  const snapshot = JSON.parse(await readFile("src/data/relay-snapshot.json", "utf8"));
  assert.doesNotThrow(() => assertRelaySnapshot(snapshot));
  assert.deepEqual(Object.keys(snapshot), ["health"]);
  assert.equal(JSON.stringify(snapshot).includes("price"), false);
  assert.equal(JSON.stringify(snapshot).includes("models"), false);
});
