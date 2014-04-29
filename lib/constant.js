

// CoAP parameters
var coap_parameters = {
    ackTimeout: 2 // seconds
  , ackRandomFactor: 1.5
  , maxRetransmit: 4
  , nstart: 1
  , defaultLeisure: 5
  , probingRate: 1 // byte/seconds

  // MAX_LATENCY is the maximum time a datagram is expected to take
  // from the start of its transmission to the completion of its
  // reception.
  , maxLatency: 100 // seconds
}

module.exports = coap_parameters;

// MAX_TRANSMIT_SPAN is the maximum time from the first transmission
// of a Confirmable message to its last retransmission.
coap_parameters.maxTransmitSpan = 
  coap_parameters.ackTimeout * 
  ((Math.pow(2, coap_parameters.maxRetransmit)) - 1) * 
  coap_parameters.ackRandomFactor

// MAX_TRANSMIT_WAIT is the maximum time from the first transmission
// of a Confirmable message to the time when the sender gives up on
// receiving an acknowledgement or reset.
coap_parameters.maxTransmitWait = 
  coap_parameters.ackTimeout * 
  (Math.pow(2, coap_parameters.maxRetransmit + 1) - 1) * 
  coap_parameters.ackRandomFactor


// PROCESSING_DELAY is the time a node takes to turn around a
// Confirmable message into an acknowledgement.
coap_parameters.processingDelay = coap_parameters.ackTimeout

// MAX_RTT is the maximum round-trip time
coap_parameters.maxRTT = 2 * coap_parameters.maxLatency + coap_parameters.processingDelay

//  EXCHANGE_LIFETIME is the time from starting to send a Confirmable
//  message to the time when an acknowledgement is no longer expected,
//  i.e.  message layer information about the message exchange can be
//  purged
coap_parameters.exchangeLifetime = coap_parameters.maxTransmitSpan + coap_parameters.maxRTT

// default port for CoAP
coap_parameters.coapPort = 5683

