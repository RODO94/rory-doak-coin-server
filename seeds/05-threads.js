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
      user_id: "1",
    },
  ]);
};
