import React from 'react'
import { StyleSheet, View, Button, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import Loader from './Loader'
import {getUpComingFilms} from '../API/Api'
import {connect} from 'react-redux'




 class Principale extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
            films: [],
            IsLoading: true,
            total_pages: 0,
            page: 1,
            img:require('../Images/coeur.png')
        }
        this.firstLoad = true
        this.TIValue = ""

    }
    componentDidMount(){
        getUpComingFilms(this.state.page)
        .then((result)=>{this.setState(
            {
                page : this.state.page+1,
                total_pages : result.total_pages,
                films: [...result.results]
            },()=>{this.setState({IsLoading: false})}
            
        )})
    }
    _handleLoading(){
        if (this.state.IsLoading) return <Loader/>
    }
    _handleNext(){
        if (this.state.total_pages-this.state.page>0) {           
            this.setState({IsLoading: true}),
            
                getUpComingFilms(this.state.page)
                .then((result)=>{
                    this.setState({
                        page : this.state.page+1,
                        films: [...this.state.films, ...result.results]
                    },this.setState({ IsLoading: false })
                    )                     
                })
                
                        
        }
    }
    _handleLoad = ()=>{
        if (this.firstLoad) {
            this.firstLoad = false;

                
        } 
    }
    _navigation(item){ this.props.navigation.navigate('DeteilsFilm', {item})}


    render(){ 
console.log('RENDER Principale')
//console.log(this.props);
//console.log(this.state.films);


        return(
            
            <View style={style.mainContainte} >
                <FlatList
                    data={this.state.films}
                    renderItem={({ item }) => <FilmItem litem={item} nav={()=>{this._navigation(item)}} />}
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={1}
                    onEndReached={()=>{this._handleNext()}}
                    extraData={this.props.favoritesFilms}
                />
            {/* <Button
                    title="Recherche"
                    onPress={() => this.props.navigation.navigate('Search')}
                /> */}
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
export default connect(mapStateToProps)(Principale)