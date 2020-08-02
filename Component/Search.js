import React from 'react'
import { Text, StyleSheet, View, TextInput, Button, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import Loader from './Loader'
import getFilmsList from '../API/Api'
import { connect } from 'react-redux'




class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            films: [],
            IsLoading: false,
            total_pages: 0,
            page: 0 
        }
        this.TIValue = ""

    }
    _handleLoading(){
        if (this.state.IsLoading) return <Loader/>
    }
    _handleNext(){
        if (this.state.total_pages-this.state.page>0) {           
            this.setState({IsLoading: true}),
            getFilmsList(this.TIValue,(this.state.page+1))
            .then((result)=>{
                this.setState(
                    {
                        page : result.page,
                        films: [...this.state.films, ...result.results]
                    },
                    this.setState({IsLoading: false})
                )     
            })  
        }
    }
    _handleClick(){ 
        
        if (this.TIValue !=='') {
            this.setState(
                {IsLoading: true},
                ()=>{getFilmsList(this.TIValue)
                    .then((result)=>{this.setState(
                        {
                            page : result.page,
                            total_pages : result.total_pages,
                            films: [...result.results]
                        },
                        ()=>{this.setState({IsLoading: false})}
                    )})
                }
            )   
        } else alert('Aucun film à rechercher...')  
    }
    _navigation(item){ this.props.navigation.navigate('DeteilsFilm', {item})}
    render(){
        
        return(
            <View style={style.mainContainte}>
                <TextInput 
                    
                    placeholder='Titre du film...' 
                    style={style.textInput}
                    onChange={(e)=>{}}
                    onChangeText={(v)=>{this.TIValue=v}}
                    onSubmitEditing={()=>{this._handleClick()}}

                />
                <Button title='Rechercher' onPress={()=>{this._handleClick()}} style={{height:50}} />
                <FlatList
                    data={this.state.films}
                    renderItem={({ item }) => <FilmItem litem = {item} nav = {()=>{this._navigation(item)}}/>}
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={1}
                    onEndReached={()=>{this._handleNext()}}
                    extraData={this.props.favoritesFilms}
                />
                
                {this._handleLoading()}
            </View>            
        )

    }
}

const style = StyleSheet.create({
    mainContainte: {
        flex: 1
    },
    textInput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    button: {
        height: 50,
    }

})
const mapStateToProps = (state)=>{return {favoritesFilms:state.favoritesFilms}}
export default connect(mapStateToProps)(Search)