/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("threads").del();
  await knex("threads").insert([
    {
      id: 1,
      thread_id: "thread_A9dsCSidKTAItUqWPa0eqZQ4",
      user_id: "57581dd2-96b8-4402-912b-c669c16f21",
    },
  ]);
};
