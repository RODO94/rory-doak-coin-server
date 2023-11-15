/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable();
    })
    .createTable("accounts", (table) => {
      table.increments("id").primary();
      table.string("bank_name").notNullable();
      table.integer("account_balance").notNullable();
      table.boolean("is_savings").defaultTo(false);
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.foreign("user_id");
    })
    .createTable("connections", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("connect_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.foreign("user_id");
    })
    .createTable("transactions", (table) => {
      table.increments().primary();
      table.integer("amount").defaultTo(0);
      table.boolean("is_settled").notNullable();
      table.string("category").notNullable();
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("account_id")
        .notNullable()
        .unsigned()
        .references("accounts.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

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
