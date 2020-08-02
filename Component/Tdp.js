import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { Badge } from 'react-native-elements'
import { connect } from 'react-redux'
import { Clipboard } from "react-native";
import { getClipData } from '../API/Api'

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style] } >
        <View style={{flexDirection:'row', justifyContent:'space-around' }} >
            <Badge value={item.nd} status="primary" containerStyle={{top: 7, right: 0 }}/>
            <Text style={styles.title}>{item.reglette+' '+item.posission}</Text>        
        </View>
    </TouchableOpacity>
  );
  
const MapTDP = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [ClipStat, setClipStat] = useState([]);
  
  const getClip = () => {
    Clipboard.getString().then(
      (result)=>(
        getClipData(result).then(
          (response)=>{console.log(response)
            switch (response.status) {
              case 300: 
                setClipStat(response.value)
                break;
              case 200:
                alert(response.msg)
                break
              case 100:
                alert(response.msg)
                break
                
              default:
                break;
            } 
          }
        )
      )
    )            
  }


  
  const renderItem = ({ item }) => {
    const backgroundColor = item.nd === selectedId ? "lightgreen" : "lightyellow";
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.nd)}
        style={{ backgroundColor }}
      />
    );
  };   

  return ( 
    
      
      <SafeAreaView style={styles.container}>
        <Button title={'Coller'} onPress={getClip}/>
        <FlatList
          data={ClipStat}
          renderItem={renderItem}
          keyExtractor={(item) => item.rep+item.reglette+item.posission}
          extraData={selectedId}
        />
        {
          //{console.log(`ClipStat: ${ClipStat}`)}
        }
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 40,
    borderRadius: 10,
    
  },
  title: {
    textAlign: "center",
    fontSize:22
  },
});

const mapStateToProps = (state)=>{return {favoritesFilms:state.favoritesFilms}}
export default connect(mapStateToProps)(MapTDP)
