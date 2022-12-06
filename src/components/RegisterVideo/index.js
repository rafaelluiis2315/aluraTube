import { createClient } from "@supabase/supabase-js";
import React from "react";
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

const PROJECT_URL = "https://bfrqqibtuedofcxhdpvo.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcnFxaWJ0dWVkb2ZjeGhkcHZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwMjYzNTUsImV4cCI6MTk4NTYwMjM1NX0.WPmkCWY4hk94WWEqgQW5QvU8OJmae6zrINjA85dl77A";

const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export default function RegisterVideo() {
    const formCadastro = useForm({ initalValues: { titulo: "", url: "", thumb: "" } });
    const [formVisivel, setFormVisivel] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>

            {formVisivel
                ? (
                    <form onSubmit={(e) => {
                        e.preventDefault();

                        // add objeto video no banco
                        supabase.from("videos").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: formCadastro.values.thumb
                        }) 
                        .then( (oqueveio) => {
                            console.log(oqueveio)
                        }).catch( (err)=>{
                            console.log(err)
                        });

                        setFormVisivel(false);
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