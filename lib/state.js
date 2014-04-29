

// current agent's states in enumeration
/*
var AGENT_STATE = {   "ON_READY":1, 
                      "ON_CONNECT":2, 
                      "ON_IDLE":3, 
                      "ON_CONNECTING":4, 
                      "ON_DISCONNECT":5, 
                      "ON_DISCONNECTING":6, 
                      "ON_TEARDOWN":7 ,
                      "ON_TERMINATING":8,
                      "ON_HEARTBEAT":9,
                      "ON_RECONNECT":10            
                  }
*/

var agent_state = {};

agent_state.isReady = "ON_READY";
agent_state.isConnected = "ON_CONNECT";
agent_state.isIdle = "ON_IDLE";
agent_state.isDisconnect = "ON_DISCONNECT";
agent_state.isRetrying = "ON_RECONNECT";
agent_state.isTerminated = "ON_TERMINATING";

module.exports = agent_state;