#pragma strict

var moveSpeed:float = 10;
var maxSpeed:float = 50;
var fireRate:float = 0.5;
var bulletSpawn:GameObject;
var bullet:GameObject;
var aimer:GameObject;

private var rb:Rigidbody;
private var nextFire:float = 0.0;

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

	Debug.Log(aimer.transform.rotation.y);


	// shooting
	if (Input.GetButton("Fire1") && Time.time > nextFire) {
		nextFire = Time.time + fireRate;
		var bulletClone = Instantiate(bullet, bulletSpawn.transform.position, bulletSpawn.transform.rotation);
	}
}