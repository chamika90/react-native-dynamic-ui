import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";

var dataType;

const getCustomComponent = (payload) => {
  dataType = getDataType(payload.data);
  return parse(payload.data, true);
};

const onButtonPress = (prop) => {
  console.warn("on button press -->", prop);
};

const getDataType = (dataStr) => {
  try {
    if (typeof dataStr === "string" && dataStr.startsWith("<")) {
      return "xml";
    } else {
      return "json";
    }
  } catch (ex) {
    return "json";
  }
};

const getComponent = (type) => {
  switch (type) {
    case "ScrollView":
      return ScrollView;
    case "View":
      return View;
    case "Text":
      return Text;
    case "TouchableOpacity":
      return TouchableOpacity;
    case "Image":
      return Image;
    case "Test":
      return Test;
    default:
      break;
  }
};

const parse = (data, flag) => {
  const { type, children, props, text, func } = data;

  const Type = getComponent(type);

  let childrenList = [];
  childrenList = children;

  return (
    <Type
      {...props}
      onPress={func !== undefined ? () => onButtonPress(func) : undefined}
    >
      {children !== undefined &&
        (dataType === "json"
          ? Array.isArray(children)
            ? children.map((item) => parse(item))
            : children
          : parse(children))}
    </Type>
  );
};

export { getCustomComponent };
