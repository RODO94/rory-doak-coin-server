/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("connections").insert([
    {
      id: 1,
      user_id: "57581dd2-96b8-4402-912b-c669c16f21a2",
      connect_id: "1",
    },
    {
      id: 2,
      user_id: "57581dd2-96b8-4402-912b-c669c16f21a2",
      connect_id: "2",
    },
    {
      id: 3,
      user_id: "57581dd2-96b8-4402-912b-c669c16f21a2",
      connect_id: "3",
    },
    {
      id: 4,
      user_id: "57581dd2-96b8-4402-912b-c669c16f21a2",
      connect_id: "4",
    },
  ]);
};
