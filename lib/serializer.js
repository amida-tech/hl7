'use strict';

var SEGMENT = '\r';
var FIELD = '|';
var COMPONENT = '^';
var FIELDREPEAT = '~';
var ESCAPE = '\\';
var SUBCOMPONENT = '&';

//Message[segment][field][repetition][component][sub-component]
function serializeComponent(data) {
    if (typeof (data) === "string") {
        return data;
    }
    return data.join(SUBCOMPONENT);
}

function serializeRepeat(data) {
    if (typeof (data) === "string") {
        return data;
    }
    return data.map(serializeComponent).join(COMPONENT);
}

function serializeField(data) {
    if (typeof (data) === "string") {
        return data;
    }
    return data.map(serializeRepeat).join(FIELDREPEAT);
}

function serializeSegment(data) {
    if (typeof (data) === "string") {
        return data;
    }

    //handling header in special way...
    if (data[0] === "MSH") {
        //clone MSH array, since we are modifying it to remove separator elements
        var msh = JSON.parse(JSON.stringify(data));
        msh.shift();
        msh.shift();
        return "MSH" + FIELD + msh.map(serializeField).join(FIELD);
    }

    return data.map(serializeField).join(FIELD);
}

function serialize(data) {
    return data.map(serializeSegment).join(SEGMENT);
}

function serializeJSON(data, options) {
    if (arguments.length === 1) {
        options = {};
    }

    var result = serialize(data);

    return result;
}

module.exports = {
    serializeJSON: serializeJSON,
};
