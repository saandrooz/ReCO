-- Har lagt in --
CREATE TABLE games (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	developer TEXT NOT NULL,
	description TEXT NOT NULL,
	image TEXT NOT NULL,
	trailer TEXT NOT NULL,
	steam_link TEXT NOT NULL
);

-- Har lagt in --
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL, 
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	created DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Har lagt in --
CREATE TABLE reviews (
	id SERIAL PRIMARY KEY,
	game_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
	review_text TEXT NOT NULL,
	created TIMESTAMP NOT NULL DEFAULT NOW(),
	UNIQUE (game_id, user_id),

  FOREIGN KEY (game_id) REFERENCES games(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Har lagt in --
CREATE TABLE genres (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);

-- Har lagt in --
CREATE TABLE game_genres (
  id SERIAL PRIMARY KEY,
	game_id INTEGER NOT NULL,
	genre_id INTEGER NOT NULL,
  UNIQUE (game_id, genre_id),

  FOREIGN KEY (game_id) REFERENCES games(id),
  FOREIGN KEY (genre_id) REFERENCES genres(id)
);

-- Tom INSERT för games för att kopiera och fylla med spel --
INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'', 
		'', 
		'', 
		'', 
		'', 
		''
		);

-- Har lagt in --
INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'R.E.P.O', 
		'Semiwork', 
		'R.E.P.O is an online co-op horror game with up to 6 players. Locate valuable, fully physics-based objects and handle them with care as you retrieve and extract to satisfy your creator''s desires', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3241660/2cff5912c1add2e009eb1c1c630a47ac06cb81a1/capsule_616x353.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/257093766/movie480_vp9.webm?t=1743517223', 
		'https://store.steampowered.com/app/3241660/REPO/'
		);

-- Har lagt in --
INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link) VALUES (
		'Lethal Company', 
		'Zeekerss', 
		'Lethal Company is a co-op horror about scavenging at abandoned moons to sell scrap to the Company.', 
		'https://cdn.dlcompare.com/game_tetiere/upload/gameimage/file/lethal-company-tetiere-file-e16ca8cf.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256961309/movie480_vp9.webm?t=1690909590', 
		'https://store.steampowered.com/app/1966720/Lethal_Company/'
		);

-- Har lagt in --
INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Don''t Starve Together', 
		'Klei Entertainment', 
		'Fight, Farm, Build and Explore Together in the standalone multiplayer expansion to the uncompromising wilderness survival game, Don''t Starve.', 
		'https://sttc.gamersgate.com/images/product/dont-starve-together/cover-616-bde91e.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/257107445/movie480_vp9.webm?t=1740689598', 
		'https://store.steampowered.com/app/322330/Dont_Starve_Together/'
		);

-- Tom INSERT för genres för att kopiera och fylla med genrer --
INSERT INTO genres (name) VALUES ('');

-- Har lagt in --
INSERT INTO genres (name) VALUES ('Horror');
INSERT INTO genres (name) VALUES ('Sci-fi');
INSERT INTO genres (name) VALUES ('Comedy');
INSERT INTO genres (name) VALUES ('Adventure');
INSERT INTO genres (name) VALUES ('Sandbox');
INSERT INTO genres (name) VALUES ('Survival');
INSERT INTO genres (name) VALUES ('Crafting');

-- Tom INSERT för game_genres för att kopiera och fylla spel med genrer --
INSERT INTO game_genres (game_id, genre_id)
VALUES (, );

-- Har lagt in --
INSERT INTO game_genres (game_id, genre_id)
VALUES (1, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (1, 2);
INSERT INTO game_genres (game_id, genre_id)
VALUES (1, 3);
INSERT INTO game_genres (game_id, genre_id)
VALUES (2, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (2, 2);
INSERT INTO game_genres (game_id, genre_id)
VALUES (2, 3);
INSERT INTO game_genres (game_id, genre_id)
VALUES (3, 4);
INSERT INTO game_genres (game_id, genre_id)
VALUES (3, 5);
INSERT INTO game_genres (game_id, genre_id)
VALUES (3, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (3, 7);