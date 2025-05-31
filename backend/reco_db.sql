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

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Resident Evil Revelations 2', 
		'CAPCOM', 
		'Survivor of the Raccoon City incident depicted in previous Resident Evil games, Claire now works for the anti-bioterrorism organization Terra Save. Moira Burton, is attending her welcome party for Terra Save when unknown armed forces storm the office. Claire and Moira are knocked unconscious and awaken later to find themselves in a dark and abandoned detention facility. Working together, they must find out who took them and to what sinister end. Will Claire and Moira make it out alive and discover what''s led to them being taken to this remote island? A story of twists and turns will have players guessing the next step at every turn.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/287290/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/2036884/movie480.webm?t=1447368249', 
		'https://store.steampowered.com/app/287290/Resident_Evil_Revelations_2/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Left 4 Dead 2', 
		'Valve', 
		'Set in the zombie apocalypse, Left 4 Dead 2 takes you and your friends through the cities, swamps and cemeteries of the Deep South, from Savannah to New Orleans across five expansive campaigns. You''ll play as one of four survivors armed with a wide and devastating array of weapons. In addition to firearms, you''ll also get a chance to take out some aggression on infected with a variety of carnage-creating melee weapons, from chainsaws to axes and even the deadly frying pan.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/550/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/5952/movie480.webm?t=1682697457', 
		'https://store.steampowered.com/app/550/Left_4_Dead_2/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Ready or Not', 
		'VOID Interactive', 
		'Ready or Not is an intense, tactical, first-person shooter that depicts a modern-day world in which SWAT police units are called to defuse hostile and confronting situations.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1144200/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256987629/movie480_vp9.webm?t=1702510541', 
		'https://store.steampowered.com/app/1144200/Ready_or_Not/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Barotrauma', 
		'FakeFish, Undertow Games', 
		'Barotrauma is a 2D co-op submarine simulator - in space, with survival horror and RPG elements. Steer your submarine, complete missions, fight monsters, fix leaks, operate machinery, man the guns and craft items, and stay alert: danger in Barotrauma doesn''t announce itself!', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/602960/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/257067392/movie480_vp9.webm?t=1729607776', 
		'https://store.steampowered.com/app/602960/Barotrauma/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Raft', 
		'Redbeet Interactive', 
		'Raft™ throws you and your friends into an epic oceanic adventure! Alone or together, players battle to survive a perilous voyage across a vast sea! Gather debris, scavenge reefs and build your own floating home, but be wary of the man-eating sharks!', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/648800/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256892239/movie480_vp9.webm?t=1655744106', 
		'https://store.steampowered.com/app/648800/Raft/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Sons Of The Forest', 
		'Endnight Games', 
		'Sent to find a missing billionaire on a remote island, you find yourself in a cannibal-infested hellscape. Craft, build, and struggle to survive, alone or with friends, in this terrifying new open-world survival horror simulator.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1326470/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256932123/movie480_vp9.webm?t=1677175226', 
		'https://store.steampowered.com/app/1326470/Sons_Of_The_Forest/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Phasmophobia', 
		'Kinetic Games', 
		'Phasmophobia is a 4 player online co-op psychological horror. Paranormal activity is on the rise and it''s up to you and your team to use all the ghost-hunting equipment at your disposal in order to gather as much evidence as you can.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/739630/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256906135/movie480_vp9.webm?t=1663254571', 
		'https://store.steampowered.com/app/739630/Phasmophobia/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Terraria', 
		'Re-Logic', 
		'Dig, Fight, Explore, Build: The very world is at your fingertips as you fight for survival, fortune, and glory. Will you delve deep into cavernous expanses in search of treasure and raw materials with which to craft ever-evolving gear, machinery, and aesthetics? Perhaps you will choose instead to seek out ever-greater foes to test your mettle in combat? Maybe you will decide to construct your own city to house the host of mysterious allies you may encounter along your travels? In the World of Terraria, the choice is yours!', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256785003/movie480_vp9.webm?t=1589654781', 
		'https://store.steampowered.com/app/105600/Terraria/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'The Outlast Trials', 
		'Red Barrels', 
		'Red Barrels invites you to experience mind-numbing terror, this time with friends. Whether you go through the trials alone or in teams, if you survive long enough and complete the therapy, Murkoff will happily let you leave… but will you be the same?', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1304930/50246c247bf813b707c2c7cee7b7ad29148e0228/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/257005515/movie480_vp9.webm?t=1709677967', 
		'https://store.steampowered.com/app/1304930/The_Outlast_Trials/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Deep Rock Galactic', 
		'Ghost Ship Games', 
		'Deep Rock Galactic is a 1-4 player co-op FPS featuring badass space Dwarves, 100% destructible environments, procedurally-generated caves, and endless hordes of alien monsters.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/548430/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/257031000/movie480_vp9.webm?t=1718276246', 
		'https://store.steampowered.com/app/548430/Deep_Rock_Galactic/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'It Takes Two', 
		'Hazelight Studios', 
		'Embark on the craziest journey of your life in It Takes Two, a genre-bending platform adventure created purely for co-op. Play as the clashing couple Cody and May, two humans turned into dolls by a magic spell. Together, trapped in a fantastical world where the unpredictable hides around every corner, they are reluctantly challenged with saving their fractured relationship.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1426210/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256827093/movie480_vp9.webm?t=1616514535', 
		'https://store.steampowered.com/app/1426210/It_Takes_Two/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Overcooked', 
		'Ghost Town Games', 
		'Overcooked is a chaotic couch co-op cooking game for one to four players. Working as a team, you and your fellow chefs must prepare, cook and serve up a variety of tasty orders before the baying customers storm out in a huff.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/448510/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256667046/movie480.webm?t=1468571743', 
		'https://store.steampowered.com/app/448510/Overcooked/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Warhammer 40,000: Darktide', 
		'Fatshark', 
		'Take back the city of Tertium from hordes of bloodthirsty foes in this intense and brutal action shooter. Warhammer 40,000: Darktide is the new co-op focused experience from the award-winning team behind the Vermintide series. As Tertium falls, Rejects Will Rise.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1361210/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/257118295/movie480_vp9.webm?t=1742931339', 
		'https://store.steampowered.com/app/1361210/Warhammer_40000_Darktide/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Warhammer: Vermintide 2', 
		'Fatshark', 
		'Warhammer: Vermintide 2 is a 4-player co-op action game set in the Warhammer Fantasy Battles world. Sequel to the critically acclaimed Vermintide, Vermintide 2 is the latest installment in a franchise best known for its intense and bloody first-person melee combat. Our five heroes have returned to take on an even greater threat than before - the combined forces of a ruinous Chaos army and the swarming Skaven horde. The only thing standing between utter defeat and victory is you and your allies. If you fall - so too will the Empire.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/552500/f0ec1638d2757060cbd8cde75c4a018a067c98bc/header_alt_assets_25.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/257077527/movie480_vp9.webm?t=1732834199', 
		'https://store.steampowered.com/app/552500/Warhammer_Vermintide_2/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'The Quarry', 
		'Supermassive Games', 
		'When the sun goes down on the last night of summer camp, nine teenage counselors are plunged into an unpredictable night of horror. The only thing worse than the blood-drenched locals and creatures hunting them are the unimaginable choices you must make to help them survive.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1577120/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256892984/movie480_vp9.webm?t=1655860354', 
		'https://store.steampowered.com/app/1577120/The_Quarry/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Generation Zero', 
		'Systemic Reaction', 
		'Generation Zero is a stealth-action shooter where you wage guerilla warfare against lethal mechanical enemies. Explore a vast open world map inspired by the Swedish Cold War era, take part in the resistance alone or with up to three friends in seamless co-op.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/704270/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256920050/movie480_vp9.webm?t=1670835574', 
		'https://store.steampowered.com/app/704270/Generation_Zero/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'GTFO', 
		'10 Chambers', 
		'GTFO is a hardcore cooperative horror shooter that throws you from gripping suspense to explosive action in a heartbeat. Stealth, strategy, and teamwork are necessary to survive in your deadly, underground prison. Work together or die together.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/493520/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256987944/movie480_vp9.webm?t=1702229106', 
		'https://store.steampowered.com/app/493520/GTFO/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Kingdom Two Crowns', 
		'Fury Studios', 
		'A shroud of mystery envelops these uncharted medieval lands where ancient monuments, relics and mythical creatures await. Echoes of bygone eras speak of past greatness and in Kingdom Two Crowns, part of the award-winning franchise Kingdom, you embark on an adventure as the Monarch. In this side-scrolling journey atop your steed, you recruit loyal subjects, build your kingdom and protect your crown from the Greed, monstrous creatures looking to steal your kingdom''s treasures.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/701160/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/257062480/movie480_vp9.webm?t=1729278931', 
		'https://store.steampowered.com/app/701160/Kingdom_Two_Crowns/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Pacify', 
		'Shawn Hitchcock', 
		'There is reportedly an evil inside that house. Something about an old funeral parlor offering a last chance to talk to their dead loved ones. Plus something about lights, laughter, a girl, missing people, etc... You know the same stuff everyone claims. Take a team, and check the place out.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/967050/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256740850/movie480.webm?t=1708618684', 
		'https://store.steampowered.com/app/967050/Pacify/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Castle Crashers', 
		'The Behemoth', 
		'Hack, slash, and smash your way to victory in this newly updated edition of the insanely popular 2D arcade adventure from The Behemoth! Up to four friends can play locally or online and save your princess, defend your kingdom, and crash some castles!', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/204360/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256657279/movie480.webm?t=1447378482', 
		'https://store.steampowered.com/app/204360/Castle_Crashers/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Rayman Legends', 
		'Ubisoft Montpellier',
		'When Rayman, Globox, and the Teensies discover a mysterious tent filled with captivating paintings, they are suddenly transported to a series of mythical new worlds! Join them as they run, jump, and slap their way through each world to get home, save the day, and discover the secrets of the legendary paintings!', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/242550/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/2029252/movie480.webm?t=1447358742', 
		'https://store.steampowered.com/app/242550/Rayman_Legends/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'The Dark Pictures Anthology: Man of Medan', 
		'Supermassive Games', 
		'In Man of Medan, five friends set sail on a holiday diving trip that soon changes into something much more sinister... Embark on a horrific journey aboard a ghost ship. Experience your terrifying story with a friend online or go for safety in numbers with up to five players offline. All playable characters can live or die. The choices you make will decide their fate. Who will you save?. Don''t. Play. Alone.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/939850/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256758195/movie480.webm?t=1564995124', 
		'https://store.steampowered.com/app/939850/The_Dark_Pictures_Anthology_Man_of_Medan/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Killing Floor', 
		'Tripwire Interactive', 
		'Killing Floor is a Co-op Survival Horror FPS set in the devastated cities and countryside of England after a series of cloning experiments for the military goes horribly wrong. You and your friends are members of the military dropped into these locations with a simple mission: Survive long enough to cleanse the area of the failed experiments!', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1250/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/5243/movie480.webm?t=1529340856', 
		'https://store.steampowered.com/app/1250/Killing_Floor/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'The Dark Pictures Anthology: Little Hope', 
		'Supermassive Games', 
		'4 college students and their professor become stranded in the abandoned town of Little Hope. Trapped by an impenetrable fog they try desperately to escape whilst witnessing terrifying visions from the past. They must figure out the motivation of these apparitions before the evil forces at work drags each of their souls to hell. Witness terrifying visions of the past, haunted by the events of the XVIIth century Andover Witch Trials. Escape the hideous apparitions that relentlessly pursue them through the fog! Abandon Hope...all who enter here!', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1194630/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256796359/movie480_vp9.webm?t=1598274256', 
		'https://store.steampowered.com/app/1194630/The_Dark_Pictures_Anthology_Little_Hope/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Stardew Valley', 
		'ConcernedApe', 
		'You''ve inherited your grandfather''s old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256660296/movie480.webm?t=1454099186', 
		'https://store.steampowered.com/app/413150/Stardew_Valley/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'A Way Out', 
		'Hazelight Studios', 
		'A Way Out is an exclusively co-op adventure where you play the role of one of two prisoners making their daring escape from prison.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1222700/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/256790157/movie480_vp9.webm?t=1592600313', 
		'https://store.steampowered.com/app/1222700/A_Way_Out/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'HELLDIVERS 2', 
		'Arrowhead Game Studios', 
		'The Galaxy''s Last Line of Offence. Enlist in the Helldivers and join the fight for freedom across a hostile galaxy in a fast, frantic, and ferocious third-person shooter.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/553850/6a629d747768128d768a7e05a042adeb558d1f85/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/257144382/movie480_vp9.webm?t=1748015349', 
		'https://store.steampowered.com/app/553850/HELLDIVERS_2/'
		);

INSERT INTO games (
	title, 
	developer, 
	description, 
	image, 
	trailer, 
	steam_link
	) VALUES (
		'Hunt: Showdown 1896', 
		'Crytek', 
		'Hunt: Showdown 1896 is a new era of the addictively unforgiving extraction shooter. In corrupted backwaters lost to history, fight back alone - or with friends - against timeless evil. Twisted monsters and other ruthless Hunters stand between you and your Bounty. Risk everything as Hunt consumes you.', 
		'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/594650/header.jpg', 
		'https://video.fastly.steamstatic.com/store_trailers/257046574/movie480_vp9.webm?t=1723744244', 
		'https://store.steampowered.com/app/594650/Hunt_Showdown_1896/'
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
INSERT INTO genres (name) VALUES ('Shooter');
INSERT INTO genres (name) VALUES ('Realistic');
INSERT INTO genres (name) VALUES ('Management');
INSERT INTO genres (name) VALUES ('Building');
INSERT INTO genres (name) VALUES ('Investigation');
INSERT INTO genres (name) VALUES ('Supernatural');
INSERT INTO genres (name) VALUES ('Action');
INSERT INTO genres (name) VALUES ('Dwarf');
INSERT INTO genres (name) VALUES ('Exploration');
INSERT INTO genres (name) VALUES ('Puzzle');
INSERT INTO genres (name) VALUES ('Story Rich');
INSERT INTO genres (name) VALUES ('Platformer');
INSERT INTO genres (name) VALUES ('Cooking');
INSERT INTO genres (name) VALUES ('Hack and Slash');
INSERT INTO genres (name) VALUES ('Fantasy');
INSERT INTO genres (name) VALUES ('Multiple Endings');


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
INSERT INTO game_genres (game_id, genre_id)
VALUES (4, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (4, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (5, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (5, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (5, 8);
INSERT INTO game_genres (game_id, genre_id)
VALUES (5, 14);
INSERT INTO game_genres (game_id, genre_id)
VALUES (6, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (6, 8);
INSERT INTO game_genres (game_id, genre_id)
VALUES (6, 9);
INSERT INTO game_genres (game_id, genre_id)
VALUES (6, 14);
INSERT INTO game_genres (game_id, genre_id)
VALUES (7, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (7, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (7, 16);
INSERT INTO game_genres (game_id, genre_id)
VALUES (7, 10);
INSERT INTO game_genres (game_id, genre_id)
VALUES (8, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (8, 7);
INSERT INTO game_genres (game_id, genre_id)
VALUES (8, 4);
INSERT INTO game_genres (game_id, genre_id)
VALUES (8, 5);
INSERT INTO game_genres (game_id, genre_id)
VALUES (9, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (9, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (9, 7);
INSERT INTO game_genres (game_id, genre_id)
VALUES (9, 11);
INSERT INTO game_genres (game_id, genre_id)
VALUES (10, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (10, 12);
INSERT INTO game_genres (game_id, genre_id)
VALUES (10, 13);
INSERT INTO game_genres (game_id, genre_id)
VALUES (11, 7);
INSERT INTO game_genres (game_id, genre_id)
VALUES (11, 4);
INSERT INTO game_genres (game_id, genre_id)
VALUES (11, 11);
INSERT INTO game_genres (game_id, genre_id)
VALUES (11, 5);
INSERT INTO game_genres (game_id, genre_id)
VALUES (12, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (12, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (12, 14);
INSERT INTO game_genres (game_id, genre_id)
VALUES (12, 4);
INSERT INTO game_genres (game_id, genre_id)
VALUES (13, 15);
INSERT INTO game_genres (game_id, genre_id)
VALUES (13, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (13, 16);
INSERT INTO game_genres (game_id, genre_id)
VALUES (14, 17);
INSERT INTO game_genres (game_id, genre_id)
VALUES (14, 18);
INSERT INTO game_genres (game_id, genre_id)
VALUES (14, 19);
INSERT INTO game_genres (game_id, genre_id)
VALUES (15, 20);
INSERT INTO game_genres (game_id, genre_id)
VALUES (15, 3);
INSERT INTO game_genres (game_id, genre_id)
VALUES (16, 21);
INSERT INTO game_genres (game_id, genre_id)
VALUES (16, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (17, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (17, 21);
INSERT INTO game_genres (game_id, genre_id)
VALUES (17, 22);
INSERT INTO game_genres (game_id, genre_id)
VALUES (18, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (18, 18);
INSERT INTO game_genres (game_id, genre_id)
VALUES (18, 23);
INSERT INTO game_genres (game_id, genre_id)
VALUES (19, 11);
INSERT INTO game_genres (game_id, genre_id)
VALUES (19, 8);
INSERT INTO game_genres (game_id, genre_id)
VALUES (19, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (19, 2);
INSERT INTO game_genres (game_id, genre_id)
VALUES (20, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (20, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (20, 8);
INSERT INTO game_genres (game_id, genre_id)
VALUES (21, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (21, 11);
INSERT INTO game_genres (game_id, genre_id)
VALUES (21, 22);
INSERT INTO game_genres (game_id, genre_id)
VALUES (22, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (22, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (22, 16);
INSERT INTO game_genres (game_id, genre_id)
VALUES (23, 21);
INSERT INTO game_genres (game_id, genre_id)
VALUES (23, 14);
INSERT INTO game_genres (game_id, genre_id)
VALUES (23, 4);
INSERT INTO game_genres (game_id, genre_id)
VALUES (24, 14);
INSERT INTO game_genres (game_id, genre_id)
VALUES (24, 19);
INSERT INTO game_genres (game_id, genre_id)
VALUES (24, 3);
INSERT INTO game_genres (game_id, genre_id)
VALUES (25, 4);
INSERT INTO game_genres (game_id, genre_id)
VALUES (25, 18);
INSERT INTO game_genres (game_id, genre_id)
VALUES (25, 23);
INSERT INTO game_genres (game_id, genre_id)
VALUES (26, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (26, 14);
INSERT INTO game_genres (game_id, genre_id)
VALUES (26, 21);
INSERT INTO game_genres (game_id, genre_id)
VALUES (27, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (27, 6);
INSERT INTO game_genres (game_id, genre_id)
VALUES (27, 18);
INSERT INTO game_genres (game_id, genre_id)
VALUES (28, 7);
INSERT INTO game_genres (game_id, genre_id)
VALUES (28, 5);
INSERT INTO game_genres (game_id, genre_id)
VALUES (28, 11);
INSERT INTO game_genres (game_id, genre_id)
VALUES (29, 4);
INSERT INTO game_genres (game_id, genre_id)
VALUES (29, 14);
INSERT INTO game_genres (game_id, genre_id)
VALUES (29, 18);
INSERT INTO game_genres (game_id, genre_id)
VALUES (30, 2);
INSERT INTO game_genres (game_id, genre_id)
VALUES (30, 3);
INSERT INTO game_genres (game_id, genre_id)
VALUES (30, 14);
INSERT INTO game_genres (game_id, genre_id)
VALUES (30, 8);
INSERT INTO game_genres (game_id, genre_id)
VALUES (31, 1);
INSERT INTO game_genres (game_id, genre_id)
VALUES (31, 8);
INSERT INTO game_genres (game_id, genre_id)
VALUES (31, 14);

-- Exempel Review bara för att testa kod. Inserts görs egentligen via post på hemsidan -- 
INSERT INTO reviews (game_id, user_id, rating, review_text) VALUES (1, 1, 10, 'The Huntsman shows up in my nightmares and the Taxman is after me. I fear for my life. 10/10 would recommend.');