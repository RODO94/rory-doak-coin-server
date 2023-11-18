/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.string("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
      table.string("known_as");
      table.string("monzo_user_id");
      table.string("monzo_token");
    })
    .createTable("accounts", (table) => {
      table.string("id").primary();
      table.string("bank_name").notNullable();
      table.integer("account_balance").notNullable();
      table.integer("savings_balance");
      table.integer("available_balance");
      table.boolean("is_savings").defaultTo(false);
      table
        .string("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("created_on").notNullable();
      table.string("type").notNullable();
      table.string("currency"), notNullable();
      table.string("country_code").notNullable();
      table.string("is_closed").notNullable();
      table.integer("spend_today");
      table.foreign("user_id");
    })
    .createTable("connections", (table) => {
      table.increments("id").primary();
      table
        .string("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .string("connect_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.foreign("user_id");
    })
    .createTable("transactions", (table) => {
      table.string("id").primary();
      table.integer("amount").defaultTo(0);
      table.boolean("is_settled").notNullable();
      table.string("category").notNullable();
      table
        .string("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .string("account_id")
        .notNullable()
        .unsigned()
        .references("accounts.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("monzo_account_id").notNullable();
      table.string("monzo_transaction_id").notNullable();
      table.integer("savings");
      table.date("created").notNullable();

      table.foreign("user_id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("accounts")
    .dropTable("connections")
    .dropTable("transactions");
};
