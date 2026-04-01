// Load environment variables for local execution outside Next.js
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' }); // Try local too if it exists

// We configure ts-node to register tsconfig-paths so aliased imports work correctly in scripts
require('tsconfig-paths/register');
const { seedDatabase } = require('../lib/seedLogic');

async function runSeed() {
  try {
    const result = await seedDatabase();
    if (result.success) {
      process.exit(0);
    } else {
      console.error(result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error("Unhandled error during seeding:", error);
    process.exit(1);
  }
}

runSeed();
