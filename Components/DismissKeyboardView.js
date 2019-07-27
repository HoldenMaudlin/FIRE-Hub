/*
 * Summary.
 * Small wrapper to dismiss keyboard when user taps outside
 *
 * @param    children    Other views to render and return. Must take keyboard to have effect
 * 
 */


// Package imports
import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

// DESC:
// Higher Order component to dismiss keyboard on press outside
const DismissKeyboardHOC = (Comp) => {
    return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};

const DismissKeyboardView = DismissKeyboardHOC(View)

export default DismissKeyboardView