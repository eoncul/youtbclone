import { createContext, useEffect, useState } from "react";
import { categories } from "../constants/Constant";
import { getData } from "../helpers/getData";
 export const YoutubeContext = createContext();

 export  function YoutubeProvider({children}){
    const[selectedCategory,setSelectedCategory]= useState(categories[0]);
    
    const[videos, setVideos]= useState(null);

    useEffect(() => {
        if (
          selectedCategory.type === "home" ||
          selectedCategory.type === "trending"
        ) {
          getData(`/${selectedCategory.type}`).then((res) => {
            setVideos(res.data.data);
          });
        }
    
        if (selectedCategory.type === "category") {
          // eski state'i temizle
          setVideos(null);
          // yeni videolar için istek at
          getData(`/search?query=${selectedCategory.name}&type=video`).then(
            (res) => {
              // state'i güncelle
              setVideos(res.data.data);
            }
          );
        }
      }, [selectedCategory]);

    return(
        <YoutubeContext.Provider value ={{selectedCategory,setSelectedCategory,videos}}>{children}</YoutubeContext.Provider>
    )

}