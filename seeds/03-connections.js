/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("connections").del();
  await knex("connections").insert([
    {
      id: 1,
      user_id: "57581dd2-96b8-4402-912b-c669c16f21a2",
      user_first_name: "Rory",
      user_last_name: "Doak",
      user_known_as: "Rory",
      connect_id: "1",
      connect_first_name: "Michaél",
      connect_last_name: "Dismatsek",
      connect_known_as: "Mikey",
    },
    {
      id: 2,
      user_id: "57581dd2-96b8-4402-912b-c669c16f21a2",
      user_first_name: "Rory",
      user_last_name: "Doak",
      user_known_as: "Rory",
      connect_id: "2",
      connect_first_name: "Samuel",
      connect_last_name: "Abukmeil",
      connect_known_as: "Sammy",
    },
    {
      id: 3,
      user_id: "57581dd2-96b8-4402-912b-c669c16f21a2",
      user_first_name: "Rory",
      user_last_name: "Doak",
      user_known_as: "Rory",
      connect_id: "3",
      connect_first_name: "Dominic",
      connect_last_name: "Van Almsick",
      connect_known_as: "Dom",
    },
    {
      id: 4,
      user_id: "57581dd2-96b8-4402-912b-c669c16f21a2",
      user_first_name: "Rory",
      user_last_name: "Doak",
      user_known_as: "Rory",
      connect_id: "57581dd2-96b8-4402-912b-c669c16f21a2",
      connect_first_name: "Rory",
      connect_last_name: "Doak",
      connect_known_as: "Rory",
    },
  ]);
};
