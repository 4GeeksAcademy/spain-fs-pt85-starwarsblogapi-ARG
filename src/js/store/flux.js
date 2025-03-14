const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            people: JSON.parse(localStorage.getItem("people")) || [],
            vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
            planets: JSON.parse(localStorage.getItem("planets")) || [],
            favorites: JSON.parse(localStorage.getItem("favorites")) || []
        },
        actions: {
            // loadData: async () => {
            //     const fetchData = async (endpoint) => {
            //         const response = await fetch(endpoint);
            //         const data = await response.json();
            //         return data.results || [];
            //     };

            //     const [people, vehicles, planets] = await Promise.all([
            //         fetchData("https://www.swapi.tech/api/people"),
            //         fetchData("https://www.swapi.tech/api/vehicles"),
            //         fetchData("https://www.swapi.tech/api/planets")
            //     ]);

            //     setStore({ people, vehicles, planets });
            //     localStorage.setItem("people", JSON.stringify(people));
            //     localStorage.setItem("vehicles", JSON.stringify(vehicles));
            //     localStorage.setItem("planets", JSON.stringify(planets));
            // },

            loadData: async () => {
                const fetchData = async (endpoint) => {
                    try {
                        const response = await fetch(endpoint);
                        const data = await response.json();
                        if (!data.results) return [];
            
                        // Obtener detalles individuales de cada ítem
                        const detailedItems = await Promise.all(
                            data.results.map(async (item) => {
                                const itemResponse = await fetch(item.url);
                                const itemData = await itemResponse.json();
            
                                return {
                                    uid: item.uid,
                                    name: item.name,
                                    properties: itemData.result.properties, // Guardamos las propiedades completas
                                };
                            })
                        );
            
                        return detailedItems;
                    } catch (error) {
                        console.error(`Error obteniendo datos de ${endpoint}:`, error);
                        return [];
                    }
                };
            
                try {
                    // Intentar cargar los datos desde localStorage primero
                    const localPeople = JSON.parse(localStorage.getItem("people")) || [];
                    const localVehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
                    const localPlanets = JSON.parse(localStorage.getItem("planets")) || [];
            
                    if (localPeople.length > 0 && localVehicles.length > 0 && localPlanets.length > 0) {
                        console.log("Cargando datos desde localStorage...");
                        setStore({ people: localPeople, vehicles: localVehicles, planets: localPlanets });
                    } else {
                        console.log("No hay datos en localStorage, obteniendo desde API...");
                        const [people, vehicles, planets] = await Promise.all([
                            fetchData("https://www.swapi.tech/api/people"),
                            fetchData("https://www.swapi.tech/api/vehicles"),
                            fetchData("https://www.swapi.tech/api/planets"),
                        ]);
            
                        const storeData = { people, vehicles, planets };
                        setStore(storeData);
            
                        // Guardamos los datos en localStorage
                        localStorage.setItem("people", JSON.stringify(people));
                        localStorage.setItem("vehicles", JSON.stringify(vehicles));
                        localStorage.setItem("planets", JSON.stringify(planets));
                    }
                } catch (error) {
                    console.error("Error cargando los datos:", error);
                }
            },

            toggleFavorite: (item, type) => {
                let store = getStore();
                
                // Recuperar favoritos desde localStorage o usar el estado global
                let favorites = JSON.parse(localStorage.getItem("favorites")) || store.favorites || [];
            
                // Verificar si el favorito ya existe (comparando por `uid`)
                const exists = favorites.some(fav => fav.uid === item.uid);
            
                if (exists) {
                    // Si ya está en favoritos, lo eliminamos
                    favorites = favorites.filter(fav => fav.uid !== item.uid);
                } else {
                    // Si no está, lo agregamos con su tipo (`type`)
                    favorites.push({ ...item, type });
                }
            
                // Guardar en LocalStorage
                localStorage.setItem("favorites", JSON.stringify(favorites));
            
                // 🔥 FORZAR ACTUALIZACIÓN DEL ESTADO GLOBAL 🔥
                setStore({ favorites: [...favorites] });
            },

            // toggleFavorite: (item,type) => {
            //     let store = getStore();
            //     //let favorites = [...store.favorites];
            //     let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            //     const exists = favorites.some(fav => fav.name === item.name);

            //     if (exists) {
            //         favorites = favorites.filter(fav => fav.name !== item.name);
            //     } else {
            //         favorites.push({ ...item,type});
            //     }

            //     setStore({ ...store, favorites });
            //     localStorage.setItem("favorites", JSON.stringify(favorites));
            // },

            fetchItemDetails: async (type, id) => {
                const store = getStore();
                
                try {
                    const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
                    if (!response.ok) {
                        throw new Error("Item no encontrado");
                    }
            
                    const data = await response.json();
                    setStore({ ...store, itemDetails: data.result });
            
                } catch (error) {
                    console.error("Error obteniendo detalles del ítem:", error);
                    setStore({ ...store, itemDetails: "NOT FOUND!" });
                }
            },
        }
    };
};

export default getState;