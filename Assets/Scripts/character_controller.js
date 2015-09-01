#pragma strict

var moveSpeed:float = 10;
var maxSpeed:float = 50;
var fireRate:float = 0.5;
var bulletSpawn:GameObject;
var bullet:GameObject;
var aimer:GameObject;
var sprite:GameObject;

private var rb:Rigidbody;
private var animator:Animator;
private var nextFire:float = 0.0;

function Start () {
	rb = GetComponent(Rigidbody);

	animator = sprite.GetComponent(Animator);
	
	// Debug.Log(Input.GetJoystickNames());
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
		// if (movementVector.magnitude < 5) {
		// 	rb.AddForce(movementVector);
		// }
	}

	animator.SetFloat("moveVel", rb.velocity.magnitude);



	// face mouse
	var aim:Vector3 = Input.mousePosition;
	
	aim.z = Mathf.Abs(Camera.main.transform.position.z - transform.position.z);
	aim = Camera.main.ScreenToWorldPoint(aim);
	aim.y = 0.5;
	aimer.transform.LookAt(aim);

	// Debug.Log(aimer.transform.eulerAngles.y);

	animator.SetFloat("aimDirection", aimer.transform.eulerAngles.y);


	// shooting
	if (Input.GetButton("Fire1") && Time.time > nextFire) {
		Debug.Log("Shot attmepted");
		nextFire = Time.time + fireRate;
		var bulletClone = Instantiate(bullet, bulletSpawn.transform.position, bulletSpawn.transform.rotation);
	}
}