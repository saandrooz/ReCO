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

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL, 
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	created DATE NOT NULL DEFAULT CURRENT_DATE
);

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

CREATE TABLE genres (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);

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



