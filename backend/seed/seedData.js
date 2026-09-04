const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Provider = require('../src/models/Provider');

// Load env variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const sampleProviders = [
  {
    name: 'Nimal Perera',
    service: 'Electrician',
    location: 'Kandy',
    phone: '077 123 4567',
    rating: 4.9,
    experience: '8 Years',
    availability: 'Available Today',
    description: 'Certified domestic and commercial electrical technician specializing in home wiring, trip fixes, and inverter setups in Kandy area.'
  },
  {
    name: 'Sunil Shantha',
    service: 'Plumber',
    location: 'Kandy',
    phone: '071 987 6543',
    rating: 4.7,
    experience: '6 Years',
    availability: 'Available Today',
    description: 'Expert plumber handling pipe leak repairs, overhead water tank installations, tap replacements, and bathroom fitting updates.'
  },
  {
    name: 'Kamal Silva',
    service: 'AC Technician',
    location: 'Colombo',
    phone: '076 555 1234',
    rating: 4.8,
    experience: '7 Years',
    availability: 'Available Today',
    description: 'Specialist in split-unit AC servicing, gas refilling, chemical washing, and inverter AC troubleshooting in Colombo and suburbs.'
  },
  {
    name: 'Bandara & Sons Auto Repair',
    service: 'Mechanic',
    location: 'Peradeniya',
    phone: '070 444 8899',
    rating: 4.6,
    experience: '12 Years',
    availability: 'Available Today',
    description: 'Mobile auto mechanic providing roadside battery jumpstarts, engine diagnostic checks, brake servicing, and routine maintenance near Peradeniya.'
  },
  {
    name: 'Roshan Fernando',
    service: 'Electrician',
    location: 'Katugastota',
    phone: '072 333 4455',
    rating: 4.5,
    experience: '5 Years',
    availability: 'Available Tomorrow',
    description: 'Reliable electrician for breaker panel replacements, light fixture fittings, ceiling fan wiring, and emergency short circuit diagnostics.'
  },
  {
    name: 'Dhammika Kumara',
    service: 'Plumber',
    location: 'Kundasale',
    phone: '075 666 7788',
    rating: 4.6,
    experience: '4 Years',
    availability: 'Available Today',
    description: 'Kundasale local plumber available for quick drainage unclogging, pressure pump fixing, and water line restoration.'
  },
  {
    name: 'Sanjeewa Electricals',
    service: 'Electrician',
    location: 'Matale',
    phone: '078 111 2233',
    rating: 4.4,
    experience: '9 Years',
    availability: 'Weekend Only',
    description: 'Comprehensive electrical repair specialist for single-phase and three-phase wiring installations in Matale district.'
  },
  {
    name: 'Nuwan Cool Tech',
    service: 'AC Technician',
    location: 'Kurunegala',
    phone: '074 888 9900',
    rating: 4.9,
    experience: '6 Years',
    availability: 'Available Today',
    description: 'Prompt AC maintenance technician for residential homes and commercial shops in Kurunegala town center.'
  },
  {
    name: 'Chinthaka Auto Solutions',
    service: 'Mechanic',
    location: 'Gampola',
    phone: '071 222 3344',
    rating: 4.7,
    experience: '10 Years',
    availability: 'Available Tomorrow',
    description: 'Skilled vehicle mechanic offering quick oil changes, suspension fixes, clutch repairs, and breakdown rescue around Gampola.'
  },
  {
    name: 'Tissa Jayasinghe',
    service: 'Plumber',
    location: 'Colombo',
    phone: '077 777 8811',
    rating: 4.9,
    experience: '11 Years',
    availability: 'Available Today',
    description: 'Senior plumbing master servicing major Colombo zones with emergency leak detection and sewer line clearance.'
  }
];

const seedDatabase = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fixlanka';
    await mongoose.connect(connStr);
    console.log('[Seed] Connected to MongoDB database...');

    await Provider.deleteMany({});
    console.log('[Seed] Cleared existing providers collection.');

    const created = await Provider.insertMany(sampleProviders);
    console.log(`[Seed] Successfully inserted ${created.length} Sri Lankan sample service providers!`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`[Seed Error] ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();

// IT24101129: Sample Sri Lankan provider data for database seeding
