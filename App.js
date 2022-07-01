import React, {useState, useEffect} from "react";
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import Torch from "react-native-torch";
import RNShake from "react-native-shake";

const App = ()=>{
  const [interruptor, setInterruptor]= useState(false);

  const handleOnPress = ()=>setInterruptor(oldInterruptor => !interruptor);

  useEffect(()=>{
    Torch.switchState(interruptor);
  },[interruptor]);

  useEffect(()=>{
    const subscription = RNShake.addListener(()=>{
      handleOnPress(oldInterruptor => !interruptor)
    });
    return ()=> subscription.remove();
  },[]);

  return (
  <View style={interruptor? style.containerLight : style.containerBlack }>
    <TouchableOpacity onPress={handleOnPress}>
      <Image 
        style={ interruptor ? style.lightOn : style.lightOff} 
        source={ interruptor? require('./assets/icons/eco-light.png'): require("./assets/icons/eco-light-off.png")}
      />

      <Image 
        style={style.logoDio} 
        source={ interruptor?   require('./assets/icons/logo-dio.png'): require("./assets/icons/logo-dio-white.png")}
      />
    </TouchableOpacity>
  </View>
)};

export default App;

const style = StyleSheet.create({
  containerBlack:{
    flex: 1, 
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLight:{
    flex: 1, 
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  lightOn:{
    resizeMode:"contain",
    alignSelf:"center",
    width: 150,
    height:150,
  },
  lightOff:{
    resizeMode:"contain",
    alignSelf:"center",
    tintColor:"white",
    width: 150,
    height:150,
  },
  logoDio:{
    resizeMode:"contain",
    alignSelf:"center",
    width: 200,
    height:200,
  },
});