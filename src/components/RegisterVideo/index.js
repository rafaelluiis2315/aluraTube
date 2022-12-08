import React from "react";
import { videoService } from "../../services/videoService";
import { StyledRegisterVideo } from "./styles";

function useForm(props) {
    const [values, setValues] = React.useState(props.initalValues);

    return {
        values,
        handleChange: (e) => {
            const value = e.target.value;
            const name = e.target.name;

            
            if (name === 'url' & value.includes("youtube.com")) {
                
                setValues({
                    ...values,
                    [name]: value,
                    thumb: `https://img.youtube.com/vi/${value.split("v=")[1]}/hqdefault.jpg`,
                });

            } else {
                
                setValues({
                    ...values,
                    [name]: value,
                });
            }

        },
        clearForm() {
            setValues({});
        }
    };
}

export default function RegisterVideo() {
    const formCadastro = useForm({ initalValues: { titulo: "", url: "", thumb: "", playList: ""} });
    const [formVisivel, setFormVisivel] = React.useState(false);
    const service = videoService();
    const [playLists, setPlayLists] = React.useState({});
    const play = {"games": 0, "Front-End": 1, "Back-End": 2}
    
    React.useEffect( () => {
        
        service.getAllPlayLists().then((dados) => {

            dados.data.forEach((playList) => {
    
                if (!playLists[playList.name]){

                    playLists[playList.name] = [
                        playList.id,
                    ]
                }
            })
        });
        
    }, []);
    
    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>

            {formVisivel
                ? (
                    <form onSubmit={(e) => {
                        //tirando ação de reload da pagina
                        e.preventDefault();
                        // add objeto video no banco
                        service.setVideo(formCadastro.values)
                        // console.log(formCadastro.values)
                        //fechando modal
                        setFormVisivel(false);
                        //limpando campos
                        formCadastro.clearForm();

                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => { setFormVisivel(false); formCadastro.clearForm(); }} >X</button>

                            <input type="text" name="titulo" placeholder="Titulo do vídeo" value={formCadastro.values.titulo} onChange={
                                formCadastro.handleChange
                            } />
                            <input type="text" name="url" placeholder="URL" value={formCadastro.values.url} onChange={
                                formCadastro.handleChange
                            } />
                            <select  name="playList" placeholder="Selecione uma playList ..." onChange={
                                formCadastro.handleChange
                            }>
                                <option value="default" defaultValue>PlayList...</option>
                                {Object.keys(playLists).map( (obj) =>{
                                    return <option value={playLists[obj]} key={playLists[obj]}>{obj}</option>
                                })}

                            </select>


                            {formCadastro.values.thumb ? (
                                <div>
                                    <img src={formCadastro.values.thumb} value={formCadastro.values.url} ></img>
                                </div>
                            ) : null
                            }
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>

                ) : null}

        </StyledRegisterVideo>
    )
}