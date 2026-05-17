/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const ChatMessage = $root.ChatMessage = (() => {

    /**
     * Properties of a ChatMessage.
     * @exports IChatMessage
     * @interface IChatMessage
     * @property {string|null} [sender] ChatMessage sender
     * @property {string|null} [content] ChatMessage content
     * @property {Uint8Array|null} [signature] ChatMessage signature
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Constructs a new ChatMessage.
     * @exports ChatMessage
     * @classdesc Represents a ChatMessage.
     * @implements IChatMessage
     * @constructor
     * @param {IChatMessage=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function ChatMessage(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ChatMessage sender.
     * @member {string} sender
     * @memberof ChatMessage
     * @instance
     */
    ChatMessage.prototype.sender = "";

    /**
     * ChatMessage content.
     * @member {string} content
     * @memberof ChatMessage
     * @instance
     */
    ChatMessage.prototype.content = "";

    /**
     * ChatMessage signature.
     * @member {Uint8Array} signature
     * @memberof ChatMessage
     * @instance
     */
    ChatMessage.prototype.signature = $util.newBuffer([]);

    /**
     * Creates a new ChatMessage instance using the specified properties.
     * @function create
     * @memberof ChatMessage
     * @static
     * @param {IChatMessage=} [properties] Properties to set
     * @returns {ChatMessage} ChatMessage instance
     */
    ChatMessage.create = function create(properties) {
        return new ChatMessage(properties);
    };

    /**
     * Encodes the specified ChatMessage message. Does not implicitly {@link ChatMessage.verify|verify} messages.
     * @function encode
     * @memberof ChatMessage
     * @static
     * @param {IChatMessage} message ChatMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatMessage.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.sender != null && Object.hasOwnProperty.call(message, "sender"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.sender);
        if (message.content != null && Object.hasOwnProperty.call(message, "content"))
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.content);
        if (message.signature != null && Object.hasOwnProperty.call(message, "signature"))
            writer.uint32(/* id 4, wireType 2 =*/34).bytes(message.signature);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified ChatMessage message, length delimited. Does not implicitly {@link ChatMessage.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ChatMessage
     * @static
     * @param {IChatMessage} message ChatMessage message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ChatMessage.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ChatMessage message from the specified reader or buffer.
     * @function decode
     * @memberof ChatMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ChatMessage} ChatMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatMessage.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.ChatMessage(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 2: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.sender = value;
                    else
                        delete message.sender;
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.string()).length)
                        message.content = value;
                    else
                        delete message.content;
                    continue;
                }
            case 4: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.bytes()).length)
                        message.signature = value;
                    else
                        delete message.signature;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes a ChatMessage message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ChatMessage
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ChatMessage} ChatMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ChatMessage.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ChatMessage message.
     * @function verify
     * @memberof ChatMessage
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ChatMessage.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.sender != null && message.hasOwnProperty("sender"))
            if (!$util.isString(message.sender))
                return "sender: string expected";
        if (message.content != null && message.hasOwnProperty("content"))
            if (!$util.isString(message.content))
                return "content: string expected";
        if (message.signature != null && message.hasOwnProperty("signature"))
            if (!(message.signature && typeof message.signature.length === "number" || $util.isString(message.signature)))
                return "signature: buffer expected";
        return null;
    };

    /**
     * Creates a ChatMessage message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ChatMessage
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ChatMessage} ChatMessage
     */
    ChatMessage.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.ChatMessage)
            return object;
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.ChatMessage();
        if (object.sender != null)
            if (typeof object.sender !== "string" || object.sender.length)
                message.sender = String(object.sender);
        if (object.content != null)
            if (typeof object.content !== "string" || object.content.length)
                message.content = String(object.content);
        if (object.signature != null)
            if (object.signature.length)
                if (typeof object.signature === "string")
                    $util.base64.decode(object.signature, message.signature = $util.newBuffer($util.base64.length(object.signature)), 0);
                else if (object.signature.length >= 0)
                    message.signature = object.signature;
        return message;
    };

    /**
     * Creates a plain object from a ChatMessage message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ChatMessage
     * @static
     * @param {ChatMessage} message ChatMessage
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ChatMessage.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            object.sender = "";
            object.content = "";
            if (options.bytes === String)
                object.signature = "";
            else {
                object.signature = [];
                if (options.bytes !== Array)
                    object.signature = $util.newBuffer(object.signature);
            }
        }
        if (message.sender != null && message.hasOwnProperty("sender"))
            object.sender = message.sender;
        if (message.content != null && message.hasOwnProperty("content"))
            object.content = message.content;
        if (message.signature != null && message.hasOwnProperty("signature"))
            object.signature = options.bytes === String ? $util.base64.encode(message.signature, 0, message.signature.length) : options.bytes === Array ? Array.prototype.slice.call(message.signature) : message.signature;
        return object;
    };

    /**
     * Converts this ChatMessage to JSON.
     * @function toJSON
     * @memberof ChatMessage
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ChatMessage.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for ChatMessage
     * @function getTypeUrl
     * @memberof ChatMessage
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    ChatMessage.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/ChatMessage";
    };

    return ChatMessage;
})();

export const KeyExchange = $root.KeyExchange = (() => {

    /**
     * Properties of a KeyExchange.
     * @exports IKeyExchange
     * @interface IKeyExchange
     * @property {Uint8Array|null} [keyCt] KeyExchange keyCt
     * @property {Uint8Array|null} [vineCt] KeyExchange vineCt
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */

    /**
     * Constructs a new KeyExchange.
     * @exports KeyExchange
     * @classdesc Represents a KeyExchange.
     * @implements IKeyExchange
     * @constructor
     * @param {IKeyExchange=} [properties] Properties to set
     * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
     */
    function KeyExchange(properties) {
        if (properties)
            for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null && keys[i] !== "__proto__")
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * KeyExchange keyCt.
     * @member {Uint8Array} keyCt
     * @memberof KeyExchange
     * @instance
     */
    KeyExchange.prototype.keyCt = $util.newBuffer([]);

    /**
     * KeyExchange vineCt.
     * @member {Uint8Array} vineCt
     * @memberof KeyExchange
     * @instance
     */
    KeyExchange.prototype.vineCt = $util.newBuffer([]);

    /**
     * Creates a new KeyExchange instance using the specified properties.
     * @function create
     * @memberof KeyExchange
     * @static
     * @param {IKeyExchange=} [properties] Properties to set
     * @returns {KeyExchange} KeyExchange instance
     */
    KeyExchange.create = function create(properties) {
        return new KeyExchange(properties);
    };

    /**
     * Encodes the specified KeyExchange message. Does not implicitly {@link KeyExchange.verify|verify} messages.
     * @function encode
     * @memberof KeyExchange
     * @static
     * @param {IKeyExchange} message KeyExchange message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KeyExchange.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.keyCt != null && Object.hasOwnProperty.call(message, "keyCt"))
            writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.keyCt);
        if (message.vineCt != null && Object.hasOwnProperty.call(message, "vineCt"))
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.vineCt);
        if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
            for (let i = 0; i < message.$unknowns.length; ++i)
                writer.raw(message.$unknowns[i]);
        return writer;
    };

    /**
     * Encodes the specified KeyExchange message, length delimited. Does not implicitly {@link KeyExchange.verify|verify} messages.
     * @function encodeDelimited
     * @memberof KeyExchange
     * @static
     * @param {IKeyExchange} message KeyExchange message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    KeyExchange.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a KeyExchange message from the specified reader or buffer.
     * @function decode
     * @memberof KeyExchange
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {KeyExchange} KeyExchange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KeyExchange.decode = function decode(reader, length, _end, _depth, _target) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $Reader.recursionLimit)
            throw Error("max depth exceeded");
        let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.KeyExchange(), value;
        while (reader.pos < end) {
            let start = reader.pos;
            let tag = reader.tag();
            if (tag === _end) {
                _end = undefined;
                break;
            }
            let wireType = tag & 7;
            switch (tag >>>= 3) {
            case 2: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.bytes()).length)
                        message.keyCt = value;
                    else
                        delete message.keyCt;
                    continue;
                }
            case 3: {
                    if (wireType !== 2)
                        break;
                    if ((value = reader.bytes()).length)
                        message.vineCt = value;
                    else
                        delete message.vineCt;
                    continue;
                }
            }
            reader.skipType(wireType, _depth, tag);
            $util.makeProp(message, "$unknowns", false);
            (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
        }
        if (_end !== undefined)
            throw Error("missing end group");
        return message;
    };

    /**
     * Decodes a KeyExchange message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof KeyExchange
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {KeyExchange} KeyExchange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    KeyExchange.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a KeyExchange message.
     * @function verify
     * @memberof KeyExchange
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    KeyExchange.verify = function verify(message, _depth) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            return "max depth exceeded";
        if (message.keyCt != null && message.hasOwnProperty("keyCt"))
            if (!(message.keyCt && typeof message.keyCt.length === "number" || $util.isString(message.keyCt)))
                return "keyCt: buffer expected";
        if (message.vineCt != null && message.hasOwnProperty("vineCt"))
            if (!(message.vineCt && typeof message.vineCt.length === "number" || $util.isString(message.vineCt)))
                return "vineCt: buffer expected";
        return null;
    };

    /**
     * Creates a KeyExchange message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof KeyExchange
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {KeyExchange} KeyExchange
     */
    KeyExchange.fromObject = function fromObject(object, _depth) {
        if (object instanceof $root.KeyExchange)
            return object;
        if (_depth === undefined)
            _depth = 0;
        if (_depth > $util.recursionLimit)
            throw Error("max depth exceeded");
        let message = new $root.KeyExchange();
        if (object.keyCt != null)
            if (object.keyCt.length)
                if (typeof object.keyCt === "string")
                    $util.base64.decode(object.keyCt, message.keyCt = $util.newBuffer($util.base64.length(object.keyCt)), 0);
                else if (object.keyCt.length >= 0)
                    message.keyCt = object.keyCt;
        if (object.vineCt != null)
            if (object.vineCt.length)
                if (typeof object.vineCt === "string")
                    $util.base64.decode(object.vineCt, message.vineCt = $util.newBuffer($util.base64.length(object.vineCt)), 0);
                else if (object.vineCt.length >= 0)
                    message.vineCt = object.vineCt;
        return message;
    };

    /**
     * Creates a plain object from a KeyExchange message. Also converts values to other types if specified.
     * @function toObject
     * @memberof KeyExchange
     * @static
     * @param {KeyExchange} message KeyExchange
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    KeyExchange.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        let object = {};
        if (options.defaults) {
            if (options.bytes === String)
                object.keyCt = "";
            else {
                object.keyCt = [];
                if (options.bytes !== Array)
                    object.keyCt = $util.newBuffer(object.keyCt);
            }
            if (options.bytes === String)
                object.vineCt = "";
            else {
                object.vineCt = [];
                if (options.bytes !== Array)
                    object.vineCt = $util.newBuffer(object.vineCt);
            }
        }
        if (message.keyCt != null && message.hasOwnProperty("keyCt"))
            object.keyCt = options.bytes === String ? $util.base64.encode(message.keyCt, 0, message.keyCt.length) : options.bytes === Array ? Array.prototype.slice.call(message.keyCt) : message.keyCt;
        if (message.vineCt != null && message.hasOwnProperty("vineCt"))
            object.vineCt = options.bytes === String ? $util.base64.encode(message.vineCt, 0, message.vineCt.length) : options.bytes === Array ? Array.prototype.slice.call(message.vineCt) : message.vineCt;
        return object;
    };

    /**
     * Converts this KeyExchange to JSON.
     * @function toJSON
     * @memberof KeyExchange
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    KeyExchange.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * Gets the type url for KeyExchange
     * @function getTypeUrl
     * @memberof KeyExchange
     * @static
     * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns {string} The type url
     */
    KeyExchange.getTypeUrl = function getTypeUrl(prefix) {
        if (prefix === undefined)
            prefix = "type.googleapis.com";
        return prefix + "/KeyExchange";
    };

    return KeyExchange;
})();

export {
  $root as default
};
