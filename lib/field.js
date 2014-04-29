/*
	first written : Daniel Q. Kim, 20140427
	
	field.js : works as namespace/room in socket.io
	- Multiple namespaces and multiple rooms share the same (Light WebSocket, CoAP, or other) connection
	- server will transmit messages over the wire only to those clients that connected to / joined a fields
*/