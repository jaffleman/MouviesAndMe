import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { Badge } from 'react-native-elements'
import { connect } from 'react-redux'
import { Clipboard } from "react-native";
import { getClipData } from '../API/Api'

const Item = ({ item, onPress, style, deteilsView }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style] } >
      <View style={{flexDirection:'row', justifyContent:'center' }} >
          <Badge value={item.nd} status="primary" containerStyle={{top: 8, right: 0 }}/>
          <Text style={styles.title}>{` -->   ${item.reglette} ${item.posission}`}</Text>        
      </View>
      {Deteils(item,deteilsView)}
  </TouchableOpacity>
);


const Deteils = ( item, deteilsView ) => {
  if (deteilsView) {
    return (
      <View>
        <Text style={styles.title}>{`Coordonnées: [${item.colone}-${item.posissionReglette}][${item.magik}]`}</Text>
        <Text style={styles.title}>{`${item.rep} - Salle:[${item.salle}] - rco:[${item.rco}]`}</Text>
      </View>
    )
  }  
}


  
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
    const deteilsView = item.nd === selectedId ? true : false;
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.nd)}
        style={{ backgroundColor }}
        deteilsView = {deteilsView}

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
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create(
  {
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
  }
);

const mapStateToProps = (state)=>{return {favoritesFilms:state.favoritesFilms}}
export default connect(mapStateToProps)(MapTDP)
