SELECT inc.id, state, inj.name injury, af.name "affectedArea", c.name cause 
FROM incidents inc
JOIN injuries inj ON inc.injuryid = inj.id 
JOIN affectedareas af ON af.id = inj.affectedareaid
JOIN causes c ON c.id = inc.causeid
WHERE state = $1