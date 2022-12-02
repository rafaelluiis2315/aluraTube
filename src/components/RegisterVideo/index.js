import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm (props) {
    const [values, setValues] = React.useState(props.initalValues);

    return{
        values,
        handleChange: (e)=> {
            const value = e.target.value;
            const name = e.target.name;

            setValues({
                ...values,
                [name]: value,
            });

            if (name === 'url' & value.includes("youtube.com")){
                const v1 = value.replace("www.", "img.");
                const v2 = v1.replace("watch?v=", "vi/");

                setValues({
                    thumb: v2+"/hqdefault.jpg",
                });
            }

        },
        clearForm(){
            setValues({});
        }
    };
}

export default function RegisterVideo () {
    const formCadastro = useForm({initalValues:{titulo: "", url: "", thumb:""}});
    const [formVisivel, setFormVisivel] = React.useState(false);
    
    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={ () => setFormVisivel(true) }>
                +
            </button>

            { formVisivel 
                ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setFormVisivel(false);
                        formCadastro.clearForm()

                    }}>
                        <div>
                            <button  type="button" className="close-modal" onClick={ () => {setFormVisivel(false); formCadastro.clearForm();} } >X</button>
        
                            <input type="" name="titulo" placeholder="Titulo do vídeo" value={formCadastro.values.titulo} onChange={
                                formCadastro.handleChange
                            }/>
                            <input type="" name="url" placeholder="URL" value={formCadastro.values.url} onChange={
                                formCadastro.handleChange
                            }/>
                            
                            

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