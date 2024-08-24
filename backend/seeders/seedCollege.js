// seed.js
const mongoose = require('mongoose');
const College = require('../models/College'); 

    // Data to seed
    const colleges = [
        {
          "name": "University of Mumbai",
          "address": "Kalina, Santacruz East, Mumbai, Maharashtra 400098",
          "contactNumber": "022-26543300",
          "website": "https://www.mu.ac.in/",
          "verified": true,
          "logo": "http://example.com/logo1.png",
          "type": "Public",
          "university": "University of Mumbai",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "400098",
          "establishmentYear": 1857,
          "affiliation": "University Grants Commission"
        },
        {
          "name": "Indian Institute of Technology Bombay",
          "address": "IIT Bombay, Powai, Mumbai, Maharashtra 400076",
          "contactNumber": "022-25722545",
          "website": "https://www.iitb.ac.in/",
          "verified": true,
          "logo": "http://example.com/logo2.png",
          "type": "Public",
          "university": "Indian Institute of Technology",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "400076",
          "establishmentYear": 1958,
          "affiliation": "Autonomous"
        },
        {
          "name": "Tata Institute of Social Sciences",
          "address": "V.N. Purav Marg, Deonar, Mumbai, Maharashtra 400088",
          "contactNumber": "022-25525000",
          "website": "https://www.tiss.edu/",
          "verified": true,
          "logo": "http://example.com/logo3.png",
          "type": "Private",
          "university": "Tata Institute of Social Sciences",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "400088",
          "establishmentYear": 1936,
          "affiliation": "Autonomous"
        },
        {
          "name": "St. Xavier's College",
          "address": "5, Mahapalika Marg, Opp. CST, Mumbai, Maharashtra 400001",
          "contactNumber": "022-22620661",
          "website": "https://xaviers.edu/",
          "verified": true,
          "logo": "http://example.com/logo4.png",
          "type": "Private",
          "university": "University of Mumbai",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "400001",
          "establishmentYear": 1869,
          "affiliation": "University Grants Commission"
        },
        {
          "name": "Jai Hind College",
          "address": "A Road, Churchgate, Mumbai, Maharashtra 400020",
          "contactNumber": "022-22062229",
          "website": "https://www.jaihindcollege.com/",
          "verified": true,
          "logo": "http://example.com/logo5.png",
          "type": "Private",
          "university": "University of Mumbai",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "400020",
          "establishmentYear": 1948,
          "affiliation": "University Grants Commission"
        },
        {
          "name": "K. J. Somaiya College of Engineering",
          "address": "Vidyanagar, Kalyan East, Mumbai, Maharashtra 421306",
          "contactNumber": "022-25425000",
          "website": "https://www.somaiya.edu/en/kjsce",
          "verified": true,
          "logo": "http://example.com/logo6.png",
          "type": "Private",
          "university": "University of Mumbai",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "421306",
          "establishmentYear": 1983,
          "affiliation": "University Grants Commission"
        },
        {
          "name": "Ramnarain Ruia College",
          "address": "Gokhale Road, Matunga, Mumbai, Maharashtra 400019",
          "contactNumber": "022-24151185",
          "website": "https://www.ruiacollege.edu/",
          "verified": true,
          "logo": "http://example.com/logo7.png",
          "type": "Private",
          "university": "University of Mumbai",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "400019",
          "establishmentYear": 1937,
          "affiliation": "University Grants Commission"
        },
        {
          "name": "SIES College of Arts, Science, and Commerce",
          "address": "SIES Campus, Sion, Mumbai, Maharashtra 400022",
          "contactNumber": "022-24061584",
          "website": "https://sies.edu.in/college/",
          "verified": true,
          "logo": "http://example.com/logo8.png",
          "type": "Private",
          "university": "University of Mumbai",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "400022",
          "establishmentYear": 1998,
          "affiliation": "University Grants Commission"
        },
        {
          "name": "Wilson College",
          "address": "Charni Road, Mumbai, Maharashtra 400004",
          "contactNumber": "022-23619008",
          "website": "https://www.wilsoncollege.edu/",
          "verified": true,
          "logo": "http://example.com/logo9.png",
          "type": "Private",
          "university": "University of Mumbai",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "400004",
          "establishmentYear": 1832,
          "affiliation": "University Grants Commission"
        },
        {
          "name": "Mumbai University Institute of Chemical Technology",
          "address": "Mumbai University Campus, Kalina, Mumbai, Maharashtra 400098",
          "contactNumber": "022-26543000",
          "website": "https://www.muict.ac.in/",
          "verified": true,
          "logo": "http://example.com/logo10.png",
          "type": "Public",
          "university": "University of Mumbai",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "400098",
          "establishmentYear": 1958,
          "affiliation": "Autonomous"
        },
        {
          "name": "Atharva College of Engineering",
          "address": "Malad, Mumbai, Maharashtra 400095",
          "contactNumber": "022-28858585",
          "website": "https://www.atharvacoe.ac.in/",
          "verified": true,
          "logo": "http://example.com/logo11.png",
          "type": "Private",
          "university": "University of Mumbai",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "400095",
          "establishmentYear": 1999,
          "affiliation": "University Grants Commission"
        },
        {
          "name": "Bharati Vidyapeeth College of Engineering",
          "address": "Navi Mumbai, Maharashtra 400614",
          "contactNumber": "022-27734810",
          "website": "https://www.bharatividyapeeth.edu/college-of-engineering-navi-mumbai",
          "verified": true,
          "logo": "http://example.com/logo12.png",
          "type": "Private",
          "university": "University of Mumbai",
          "state": "Maharashtra",
          "city": "Mumbai",
          "pincode": "400614",
          "establishmentYear": 1990,
          "affiliation": "University Grants Commission"
        }
      ]
      

    // Insert data
    
// Function to seed the database
const seedDatabase = async () => {
    try {
      await College.deleteMany(); // Clear the existing data
      await College.insertMany(colleges); // Insert new data
      console.log('Colleges data inserted successfully');
    
    } catch (error) {
      console.error('Error inserting data:', error);
      
    }
  };