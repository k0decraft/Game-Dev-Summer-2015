#pragma strict

public var player:GameObject;
public var level:String;

function Start () {

}

function Update () {

}


function OnTriggerEnter (other : Collider) {
	
	if (other.gameObject == player) {
		
		Destroy(gameObject);
		Debug.Log("player hit level changer");
		
		Application.LoadLevel(level);
		
	}

}