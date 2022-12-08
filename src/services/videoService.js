import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://bfrqqibtuedofcxhdpvo.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcnFxaWJ0dWVkb2ZjeGhkcHZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwMjYzNTUsImV4cCI6MTk4NTYwMjM1NX0.WPmkCWY4hk94WWEqgQW5QvU8OJmae6zrINjA85dl77A";

const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            // return supabase.from("videos").select("*");
            return supabase.from("rel_playLists_videos").select("playLists(name), videos(title, url, thumb)");
        },
        getAllPlayLists(){
            return supabase.from("playLists").select("id, name");
        },
        setVideo(props) {

            supabase.from("videos").insert({
                title: props.titulo,
                url: props.url,
                thumb: props.thumb
            }).select("*")
            .then( async (dados) => {
                //pegango id do video
                let id = 0;
                dados.data.forEach(  (video) => {
                    id = video.id  
                })
                
                //adicinando video na tabela relação playlist/video
                supabase.from("rel_playLists_videos").insert({
                    id_videos: id,
                    id_playList: props.playList,
                }).select("*")
                .then( (dados) => {
    
                    console.log(dados)
    
                }).catch( (err)=>{
                    console.log(err)
                });
            });
        },
    }
}