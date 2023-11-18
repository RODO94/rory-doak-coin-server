/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").insert([
    {
      id: 1,
      first_name: "Michaél",
      last_name: "Dismatsek",
      email: " md@badboy.com",
      known_as: "Mikey",
      monzo_user_id: "11",
      monzo_token: "11",
    },
    {
      id: 2,
      first_name: "Samuel",
      last_name: "Abukmeil",
      email: "sammyAbs@gammy.com",
      known_as: "Sammy",
      monzo_user_id: "22",
      monzo_token: "22",
    },
    {
      id: 3,
      first_name: "Dominic",
      last_name: "Van Almsick",
      email: "da@daddy.com",
      known_as: "Dom",
      monzo_user_id: "33",
      monzo_token: "33",
    },
    {
      id: 4,
      first_name: "Joseph",
      last_name: "Di Trolio",
      email: "JoeyD69@trolly.com",
      known_as: "Joe",
      monzo_user_id: "44",
      monzo_token: "44",
    },
  ]);
};
