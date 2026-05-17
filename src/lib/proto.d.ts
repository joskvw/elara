import * as $protobuf from "protobufjs";
import Long = require("long");
/** Properties of a ChatMessage. */
export interface IChatMessage {

    /** ChatMessage sender */
    sender?: (string|null);

    /** ChatMessage content */
    content?: (string|null);

    /** ChatMessage signature */
    signature?: (Uint8Array|null);

    /** Unknown fields preserved while decoding */
    $unknowns?: Uint8Array[];
}

/** Represents a ChatMessage. */
export class ChatMessage implements IChatMessage {

    /**
     * Constructs a new ChatMessage.
     * @param [properties] Properties to set
     */
    constructor(properties?: IChatMessage);

    /** Unknown fields preserved while decoding */
    public $unknowns?: Uint8Array[];

    /** ChatMessage sender. */
    public sender: string;

    /** ChatMessage content. */
    public content: string;

    /** ChatMessage signature. */
    public signature: Uint8Array;

    /**
     * Creates a new ChatMessage instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ChatMessage instance
     */
    public static create(properties?: IChatMessage): ChatMessage;

    /**
     * Encodes the specified ChatMessage message. Does not implicitly {@link ChatMessage.verify|verify} messages.
     * @param message ChatMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified ChatMessage message, length delimited. Does not implicitly {@link ChatMessage.verify|verify} messages.
     * @param message ChatMessage message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IChatMessage, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ChatMessage message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ChatMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ChatMessage;

    /**
     * Decodes a ChatMessage message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ChatMessage
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ChatMessage;

    /**
     * Verifies a ChatMessage message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a ChatMessage message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ChatMessage
     */
    public static fromObject(object: { [k: string]: any }): ChatMessage;

    /**
     * Creates a plain object from a ChatMessage message. Also converts values to other types if specified.
     * @param message ChatMessage
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: ChatMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this ChatMessage to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the type url for ChatMessage
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    public static getTypeUrl(prefix?: string): string;
}

/** Properties of a KeyExchange. */
export interface IKeyExchange {

    /** KeyExchange keyCt */
    keyCt?: (Uint8Array|null);

    /** KeyExchange vineCt */
    vineCt?: (Uint8Array|null);

    /** Unknown fields preserved while decoding */
    $unknowns?: Uint8Array[];
}

/** Represents a KeyExchange. */
export class KeyExchange implements IKeyExchange {

    /**
     * Constructs a new KeyExchange.
     * @param [properties] Properties to set
     */
    constructor(properties?: IKeyExchange);

    /** Unknown fields preserved while decoding */
    public $unknowns?: Uint8Array[];

    /** KeyExchange keyCt. */
    public keyCt: Uint8Array;

    /** KeyExchange vineCt. */
    public vineCt: Uint8Array;

    /**
     * Creates a new KeyExchange instance using the specified properties.
     * @param [properties] Properties to set
     * @returns KeyExchange instance
     */
    public static create(properties?: IKeyExchange): KeyExchange;

    /**
     * Encodes the specified KeyExchange message. Does not implicitly {@link KeyExchange.verify|verify} messages.
     * @param message KeyExchange message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(message: IKeyExchange, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Encodes the specified KeyExchange message, length delimited. Does not implicitly {@link KeyExchange.verify|verify} messages.
     * @param message KeyExchange message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(message: IKeyExchange, writer?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a KeyExchange message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns KeyExchange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): KeyExchange;

    /**
     * Decodes a KeyExchange message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns KeyExchange
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): KeyExchange;

    /**
     * Verifies a KeyExchange message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): (string|null);

    /**
     * Creates a KeyExchange message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns KeyExchange
     */
    public static fromObject(object: { [k: string]: any }): KeyExchange;

    /**
     * Creates a plain object from a KeyExchange message. Also converts values to other types if specified.
     * @param message KeyExchange
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(message: KeyExchange, options?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this KeyExchange to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the type url for KeyExchange
     * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
     * @returns The type url
     */
    public static getTypeUrl(prefix?: string): string;
}
