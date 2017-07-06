INSERT INTO incidents(state, injuryid, causeid)
VALUES($1, $2, $3) returning id, state