const initialState={favoritesFilms: []}

function toggleFavorite(state=initialState, action){
    let nextState;
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            
            const favoriteFilmIndex = state.favoritesFilms.findIndex(element=>element===action.value.id)
                                    
            if (favoriteFilmIndex !== -1){
                //suppresion des favories
                nextState = {
                    ...state,
                    favoritesFilms : state.favoritesFilms.filter((item,index)=>index !== favoriteFilmIndex)
                }
            }else{
                //ajout aux favories
                nextState = {
                    ...state,
                    favoritesFilms: [...state.favoritesFilms,action.value.id]
                }
            }
            return nextState||state
            default:
                return state
    }
}
export default toggleFavorite
