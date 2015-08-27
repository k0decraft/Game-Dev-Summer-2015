#pragma strict

public var patrolPoints:GameObject[] = [];
public var speed:float = 2;
public var pauseAtPatrolPointTime:float = 0.5f;
public var pauseAfterLosingSightOfPlayerTime:float = 1f;
public var character:GameObject;
public var visibilityRadius:float = 4.0f;

private var patrolPointsArray:Array = new Array();

// this get set to true when the enemy hits a patrol point and pauses for a moment, 
// or if the enemy was chasing the player, and has lost sight of him.
private var confused:boolean = false;

// this gets set to true when the enemy starts chasing the player. we need it so that
// when we detect that the player has escaped, we can switch to confused mode for a moment.
private var chasing:boolean = false;


function Start () {
	
	if (!character) {
		Debug.LogWarning("Enemies need a reference to the character, or they won't chase her.");
	}
	
	for (var i = 0; i < patrolPoints.length; i++) {
		patrolPointsArray.Push(patrolPoints[i]);
	}
}

function Update () {

	var movingToward:GameObject;
	
	if (playerIsWithinSightRadius()) {
		// chase player
		chasing = true;
		movingToward = character;
	} else if (confused) {
		// enemy is paused for a moment.
		return;
	} else if (chasing) {
		// was chasing player, but player has escaped
		pauseAfterLosingSightOfPlayer();
		return;		
	} else {
		// move to patrol point
		movingToward = patrolPointsArray[0] as GameObject;
	}
		
	// The step size is equal to speed times frame time.
	var step = speed * Time.deltaTime;
		
	// Move our position a step closer to the target.
	transform.position = Vector3.MoveTowards(transform.position, movingToward.transform.position, step);
}


function playerIsWithinSightRadius() {

	if (!character) return false;
	
	var dist = Vector3.Distance(transform.position, character.transform.position);
	if (dist < visibilityRadius) return true;

	return false;
}


//function OnCollisionEnter(collision: Collision) {
function OnTriggerEnter (other : Collider) {
	if (other.gameObject == patrolPointsArray[0]) {
		// enemy has hit their next patrol point, time to change it and move back toward the next one
		patrolPointsArray.Push(patrolPointsArray.Shift());
		pauseAtPatrolPoint();
	}
}


function killVelocity() {
	var rb = GetComponent.<Rigidbody>();
	rb.velocity = Vector3(0,0,0);
}

function pauseAtPatrolPoint() {
	killVelocity();
	confused = true;
	yield WaitForSeconds(pauseAtPatrolPointTime);
	confused = false;
}



function pauseAfterLosingSightOfPlayer() {
	killVelocity();
	chasing = false;
	confused = true;
	yield WaitForSeconds(pauseAfterLosingSightOfPlayerTime);
	confused = false;
}























