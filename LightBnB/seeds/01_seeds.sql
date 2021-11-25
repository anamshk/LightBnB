INSERT INTO users (name, email, password)
VALUES ('Sara', 'sara.jenkins@travel.com', '$2a$10$FB'),
('Rob', 'rob_hall73@vacations.com', 'BOAVhpuLvpOREQVmvmezD4ED'),
('Carol', 'car_batista@trips.com', '.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Fantastic view', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 140, 0, 1, 3, 'Canada', 'Beverton', 'Atlas', 'ON', 'T3H 4L4', true),
(2, 'Beachfront Property', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 250, 0, 1, 2, 'Canada', 'Wasaga', 'Beach', 'BC', 'J9I 2T8', true),
(3, 'In the 6ix', 'description', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg', 300, 0, 3, 5, 'Canada', 'Wethe', 'North', 'ON', 'T0R 0N0', true);

INSERT INTO reservations (guest_id, property_id, start_date, end_date)
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES(1, 1, 1, 4, 'message'),
(1, 2, 2, 4, 'message'),
(3, 2, 3, 2, 'message');