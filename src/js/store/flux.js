const getState = ({ getStore, getActions, setStore }) => ({
    store: {
        favorites: [],
    },
    actions: {
        toggleFavorite: (item) => {
            const store = getStore();
            if (!store.favorites.some(fav => fav.url === item.url)) {
                setStore({ favorites: [...store.favorites, item] });
            }
        },
        removeFavorite: (item) => {
            const store = getStore();
            setStore({ favorites: store.favorites.filter(fav => fav.url !== item.url) });
        },

    }
});
export default getState;