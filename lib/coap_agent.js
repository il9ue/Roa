
const bl              = require('bl')
    , util            = require('util')
    , events          = require('events')
    , dgram           = require('dgram')
    , parse           = require('coap-packet').parse
    , generate        = require('coap-packet').generate
    , URL             = require('url')
    , IncomingMessage = require('./incoming_message')
    , OutgoingMessage = require('./outgoing_message')
    , ObserveStream   = require('./observe_read_stream')
    , parameters      = require('./parameters')
    , optionsConv     = require('./option_converter')
    , RetrySend       = require('./retry_send')
    , maxToken        = Math.pow(2, 32)
    , maxMessageId    = Math.pow(2, 16)
