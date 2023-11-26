/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("table_name").del();
  await knex("connections").insert([
    {
      id: 1,
      user_id: "1",
      connect_id: "2",
      user_first_name: "Michael",
      user_known_as: "Mikey",
      connect_known_as: "Sammy",
      connect_first_name: "Samuel",
    },
    {
      id: 1,
      user_id: "1",
      connect_id: "3",
      user_first_name: "Michael",
      user_known_as: "Mikey",
      connect_known_as: "Dom",
      connect_first_name: "Dominic",
    },
    {
      id: 1,
      user_id: "1",
      connect_id: "4",
      user_first_name: "Michael",
      user_known_as: "Mikey",
      connect_known_as: "Joe",
      connect_first_name: "Joseph",
    },
  ]);
};
