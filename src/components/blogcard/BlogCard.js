import React, {useContext, useState, useEffect, useRef} from "react";
import Styles from "./Blogcard.module.css"
import marked from "marked"
import { StateContext } from "../statecontext/stateContext";
import YouTubePlayer from 'youtube-player';

function BlogCard(){
    const [rotpost, setRotPost] = useState([])
    const {filteredEntries}=useContext(StateContext);
    const vid = useRef(null);
   

    
    useEffect(()=>{
    const newRots = filteredEntries.map(() => 0)
    setRotPost(newRots)
     
    }, [filteredEntries])

    
      function Rotatenow(idi){
        const fish=document.getElementById(idi).classList

        const newRotPost = rotpost.map((rot, index) => {
            if (index === idi ) {
                if(rot===0){return 1}
                else if(rot===1){return 2}
                else {return 0}
            } 
            
            if (index!==idi){
                if(rot!==0){
                const dog=document.getElementById(index).classList
                dog.remove(Styles.rotatright)
                dog.remove(Styles.rotatleft)
                dog.add(Styles.entry)
               
               
                const train = filteredEntries[index].sys.id
                console.log(filteredEntries[index].sys.id)
                YouTubePlayer(`${train}`).stopVideo().then(()=>{
                
                })}
                
                return 0}
            //}

            return rot

           

        })
        setRotPost(newRotPost);
        if(rotpost[idi]===0){
            fish.remove(Styles.entry)
            fish.add(Styles.rotatright);
        } else if(rotpost[idi]===1){
            fish.remove(Styles.rotatright);
            fish.add(Styles.rotatleft);
        } else {
            fish.remove(Styles.rotatleft);
            fish.add(Styles.entry);

        }
        
    }

return(
    <div >
        {  filteredEntries!==0?
            filteredEntries.map((entry, id) => (
                            
                            
                <div className={Styles.entrycontainer}>
                    <div onClick={()=>Rotatenow(id)} className={Styles.entry} id={id} key={entry.sys.id}>
                        <div className={Styles.front}>
                            <h1 >{entry.fields.title}</h1>
                            <img src={entry.fields.image.fields.file.url} alt="" /> 
                        </div>  
                        <div className={Styles.right}>
                            <section
                            className={Styles.description}
                            dangerouslySetInnerHTML={{ __html: marked(entry.fields.description)}}  
                        />  
                        </div>  
                        <div className={Styles.left}>
                            <section
                            className={Styles.iframe}
                            dangerouslySetInnerHTML={{ __html: marked(entry.fields.yt)}}  
                        />  
                        </div>             
                    </div>
                </div>


            )):console.log("hello")
        }

    </div>
    
)

}

export default BlogCard;