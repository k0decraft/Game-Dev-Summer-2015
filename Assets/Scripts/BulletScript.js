﻿#pragma strict

private var rb:Rigidbody;
//private var collisionTime:float = Time.time + 5000;

public var speed:float = 2300;
public var destroyTime:float = 1;


function Start () {
	// Public variable 

	rb = GetComponent(Rigidbody);
	// rb.velocity = transform.forward * speed;
	rb.AddForce(transform.forward * speed);

}

function Update () {
	// rb.velocity = transform.forward * speed;
	// rb.AddForce(transform.forward * speed);
//	if (Time.time >= collisionTime + destroyTime) {
//		Debug.Log("TTL destroy!");
//		Destroy(gameObject);
//	}

	Destroy(gameObject, destroyTime);
}

function OnBecameInvisible() {  
	// Destroy the bullet 
	//Debug.Log("OnBecameInvisible destroy!");
	//Destroy(gameObject);
}

function OnCollisionEnter(collision: Collision) {
	// for (var contact: ContactPoint in collision.contacts) {
	// 	Debug.DrawRay(contact.point, contact.normal, Color.white);
	// }
	// if (collision.relativeVelocity.magnitude > 2)
	// 	audio.Play();
//	collisionTime = Time.time;
}