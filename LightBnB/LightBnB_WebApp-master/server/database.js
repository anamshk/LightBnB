const properties = require('./json/properties.json');
const users = require('./json/users.json');
const {
  Pool
} = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = (id) => {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = (user) => {
  return pool
    .query(`INSERT INTO users (name, email, password)
    VALUES($1, $2, $3) 
    RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => result.rows[0])
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = (guestId, limit = 10) => {
  return pool
    .query((`SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
    FROM reservations 
    JOIN properties ON properties.id = reservations.property_id
    JOIN property_reviews ON reservations.id = reservation_id
    GROUP BY reservations.id, properties.id
    LIMIT $1`), [limit])
    .then((result) => result.rows)
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  console.log(options, "THIS IS test");
  //make array that will hold any parameter in query
  const queryParams = [];
  //start the inital/default query
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  //if the city option parameter has entered
  if (options.city) {
    const hasWhereOrAnd = queryParams.length > 0;
    queryParams.push(`%${options.city}%`);
    queryString += `${ hasWhereOrAnd ? ' AND ' : ' WHERE '}  city LIKE $${queryParams.length}`;
  }

  //owner logged in
  if (options.owner_id) {
    const hasWhereOrAnd = queryParams.length > 0;
    queryParams.push(options.owner_id);
    queryString += `${hasWhereOrAnd ? ' AND ' : ' WHERE '} owner_id = $${queryParams.length}`;
  }

  // nights

  if (options.minimum_price_per_night) {
    const hasWhereOrAnd = queryParams.length > 0;
    queryParams.push(options.minimum_price_per_night);
    queryString += ` ${hasWhereOrAnd ? ' AND ' : ' WHERE '} cost_per_night > $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    const hasWhereOrAnd = queryParams.length > 0;
    queryParams.push(options.maximum_price_per_night);
    queryString += `${hasWhereOrAnd ? ' AND ' : ' WHERE '} cost_per_night < $${queryParams.length}`;
  }

  if (options.minimum_rating) {
    const hasWhereOrAnd = queryParams.length > 0;
    queryParams.push(options.minimum_rating);
    queryString += `${hasWhereOrAnd ? ' AND ' : ' WHERE '} rating > $${queryParams.length}`;
  }

  // other WHERE queries
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  //return the whole output
  console.log(queryString, queryParams);

  // run the query
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;