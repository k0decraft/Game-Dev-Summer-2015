#pragma strict

var moveSpeed:float = 10;
var maxSpeed:float = 50;
var bulletSpawn:GameObject;
var bullet:GameObject;
var girlSprite:GameObject;
var aimer:GameObject;

private var rb:Rigidbody;

function Start () {
	rb = GetComponent(Rigidbody);
	
	Debug.Log(Input.GetJoystickNames());
}

function FixedUpdate () {

	// movement
	var movementVector:Vector3;

	if (Input.GetAxis("Horizontal")) {
		movementVector.x = Input.GetAxis("Horizontal");
	}
	if (Input.GetAxis("Vertical")) {
		movementVector.z = Input.GetAxis("Vertical");
	}
	if (movementVector.magnitude > 0.001) {
		Vector3.Normalize(movementVector);
		movementVector *= moveSpeed;
		rb.velocity = movementVector;
		// rb.AddForce(movementVector);
	}



	// face mouse
	var aim:Vector3 = Input.mousePosition;
	
	aim.z = Mathf.Abs(Camera.main.transform.position.y - transform.position.y);
	aim = Camera.main.ScreenToWorldPoint(aim);
	aimer.transform.LookAt(aim);


	// shooting
	if (Input.GetButtonDown("Fire1")) {
		Instantiate(bullet, bulletSpawn.transform.position, bulletSpawn.transform.rotation);
	}
}