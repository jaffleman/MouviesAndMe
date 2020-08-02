import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";



class Loader extends React.Component {
    render() {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
        
      flex: 1,
      justifyContent: "center",
      position: 'absolute',
      left:0,
      right:0,
      top:100,
      bottom:0,
      alignItems: 'center'

      
      
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 0
    }
  });
  export default Loader