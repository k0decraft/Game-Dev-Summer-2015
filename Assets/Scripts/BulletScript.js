#pragma strict

private var rb:Rigidbody;
private var collisionTime:float;

public var speed:float = 2300;
public var destroyTime:float = 0.01;


function Start () {
	// Public variable 

	rb = GetComponent(Rigidbody);
	// rb.velocity = transform.forward * speed;
	rb.AddForce(transform.forward * speed);

}

function Update () {
	// rb.velocity = transform.forward * speed;
	// rb.AddForce(transform.forward * speed);
	if (Time.time >= collisionTime + destroyTime) {
		Debug.Log("bullet destroy");
		Destroy(gameObject);
	}
}

function OnBecameInvisible() {  
	// Destroy the bullet 
	Destroy(gameObject);
}

function OnCollisionEnter(collision: Collision) {
	// for (var contact: ContactPoint in collision.contacts) {
	// 	Debug.DrawRay(contact.point, contact.normal, Color.white);
	// }
	// if (collision.relativeVelocity.magnitude > 2)
	// 	audio.Play();
	Debug.Log("bullet collide");
	collisionTime = Time.time;
}