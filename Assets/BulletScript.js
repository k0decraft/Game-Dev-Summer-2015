#pragma strict

private var rb:Rigidbody;
public var speed:float = 2300;


function Start () {
	// Public variable 

	rb = GetComponent(Rigidbody);
	// rb.velocity = transform.forward * speed;
	rb.AddForce(transform.forward * speed);

}

function Update () {
	// rb.velocity = transform.forward * speed;
	// rb.AddForce(transform.forward * speed);
}

function OnBecameInvisible() {  
	// Destroy the bullet 
	Destroy(gameObject);
}