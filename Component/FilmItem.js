
import {connect} from 'react-redux'
import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getImageFromApi } from '../API/Api'
import { TouchableOpacity } from 'react-native-gesture-handler'


class FilmItem extends React.Component {
constructor(props){
  super(props)
  
  this.img1=require('../Images/coeur.png')
  this.img2=require('../Images/coeur_plein.png')
  
}

Icone(){
  const index = this.props.favoritesFilms.findIndex((item)=>item===this.props.litem.id)
  if (index !== -1) {
    return  this.img2
  } else{
    return this.img1
  }
 
}

  
componentDidUpdate(){
  
}

  render() {
  console.log('RENDER FilmItems');
  
      
      const {title, overview, release_date, vote_average, poster_path, id} = this.props.litem
      
    return (
      <TouchableOpacity onPress={()=>{this.props.nav()}} style={styles.main_container}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(poster_path)}}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>

          <View>
          <Text style={styles.title_text}>{title}</Text>
            <Image
                style={styles.tinyLogo}
                source={this.Icone()}
            /> 
          </View>

            <Text style={styles.vote_text}>{vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>{overview}</Text>
            {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {release_date}</Text>
          </View>
        </View>
      
      </TouchableOpacity>
      
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 190,
    flexDirection: 'row'
  },
  image: {
    width: 120,
    height: 180,
    margin: 5,
    backgroundColor: 'gray'
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  header_container: {
    flex: 3,
    flexDirection: 'row'
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  description_container: {
    flex: 7
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date_text: {
    textAlign: 'right',
    fontSize: 14
  }
})

const mapStateToProps = (state)=>{return {favoritesFilms:state.favoritesFilms}}
export default connect(mapStateToProps)(FilmItem)