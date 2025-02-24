import { TouchableWithoutFeedback, Keyboard } from "react-native";

import { ReactNode } from "react";

const DismissKeyboard = ({ children }: { children: ReactNode }) => {
    return (
      <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
      >
          {children}
      </TouchableWithoutFeedback>
    )
  }
  
  export default DismissKeyboard;