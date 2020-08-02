
// Components/FilmDetail.js

import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, Button } from 'react-native'
import { getfilmsDeteils, getImageFromApi } from '../API/Api'
import {connect} from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import { TouchableOpacity } from 'react-native-gesture-handler'


class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true,
      img:require('../Images/coeur.png')
    }
  }

    _toggleFavLoad(){
        const index = this.props.favoritesFilms.findIndex((item)=>item===this.state.film.id)
        console.log(index)
        if (index !== -1){
           //n'appartient pas au favoris
            const req = require('../Images/coeur_plein.png')
            this.setState({
                img:req 
            })
        }else{
            //appartient au favoris
            const req = require('../Images/coeur.png')
            this.setState({
              img:req           
            })
        }
    }
    _toggleFav(){
        const index = this.props.favoritesFilms.findIndex((item)=>item===this.state.film.id)
        console.log(index)
        if (index !== -1){
           //n'appartient pas au favoris
            const req = require('../Images/coeur.png')
            this.setState({
                img:req 
            })
        }else{
            //appartient au favoris
            const req = require('../Images/coeur_plein.png')
            this.setState({
              img:req           
            })
        }
    }
  componentDidMount() {
    getfilmsDeteils(this.props.route.params.item.id).then(data => {
      this.setState({
        film: data,
        isLoading: false
      }, this._toggleFavLoad)
    
    })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _toggleFavorite(){  
          
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film }
    
    this.props.dispatch(action)
    this._toggleFav()
    
  }

  componentDidUpdate(){
    
      
  }

  _displayFilm() {
    const { film } = this.state
    if (film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.backdrop_path)}}
          />
          
          <TouchableOpacity style={{alignItems:'center'}} onPress={()=> this._toggleFavorite()}>
          <Text style={styles.title_text}>{film.title}</Text>
            <Image
                style={styles.tinyLogo}
                source={this.state.img}
            /> 
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function(genre){
              return genre.name;
            }).join(" / ")}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function(company){
              return company.name;
            }).join(" / ")}
          </Text>
        </ScrollView>
      )
    }
  }

  render() {
       
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  tinyLogo: {
    width: 20,
    height: 20,
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 169,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }
})
const mapStateToProps = (state)=>{return {favoritesFilms:state.favoritesFilms}}
export default connect(mapStateToProps)(FilmDetail)