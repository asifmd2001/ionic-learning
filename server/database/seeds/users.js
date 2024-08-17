const faker = require('@faker-js/faker');

// This file will clear the existing contacts table and add 20 rows with mock data from faker

// faker fields: https://github.com/faker-js/faker#api-methods
const createMockUsers = (num) => {
  return [...Array(num)].map(() => {
    // Generate random hour between 9 and 10:30 AM
    const entryHour = faker.datatype.number({ min: 9, max: 10 });
    const entryMinute = faker.datatype.number({ min: 0, max: entryHour === 10 ? 30 : 59 });

    // Create entry time for today
    const today = new Date();
    const entryTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), entryHour, entryMinute);

    // Exit time: 8 to 10 hours after entry time
    const exitTime = new Date(entryTime.getTime() + faker.datatype.number({ min: 8, max: 10 }) * 60 * 60 * 1000);

    // Generate Indian phone number (starts with +91 and followed by a 10-digit number)
    const phone = `+91 ${faker.datatype.number({ min: 6000000000, max: 9999999999 })}`;

    return {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`, // Generating random Indian name
      phone: phone, // Indian phone number format
      entryTime: entryTime,
      exitTime: exitTime,
    };
  });
};


exports.seed = async (knex) => {
  try {
    await knex('users').del();
  } catch (e) {
    console.log(e);
  }
  return knex('users').insert(createMockUsers(50));
};
