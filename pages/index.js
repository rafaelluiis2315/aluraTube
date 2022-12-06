import { createClient } from "@supabase/supabase-js";
import React from "react";
import styled from "styled-components";
import config from "../config.json";

import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";


function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playLists, setPlayLists] = React.useState({});

    React.useEffect( () => {
        service.getAllVideos().then((dados) => {
            const novasPlayLists = { ...playLists };
            dados.data.forEach((video) => {
                if (!novasPlayLists["jogo"]) novasPlayLists["jogo"] = [];

                novasPlayLists["jogo"] = [
                    video,
                    ...novasPlayLists["jogo"],
                ];

            })

            setPlayLists(novasPlayLists);
        });
    }, []);

    return (
        <>
           
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timline searchValue={valorDoFiltro} playList={playLists} />
            </div>
        </>
    );
}

export default HomePage


const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`
const StyledBanner = styled.div`
    // Pegando o valor do config.bg como prop
    background-image: url(${({ bg }) => bg }) ;

    // Acessando o config diretamente
    /* background-image: url(${config.bg}); */
    
    background-size: 100%; 
    background-position: center;
    height: 230px;
`

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg = {config.bg}/>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timline({ searchValue, ...props }) {
    const playListName = Object.keys(props.playList);
    return (
        <StyledTimeline>
            {playListName.map((playListName) => {
                const videos = props.playList[playListName];

                return (
                    <section key={playListName}>
                        <h2>{playListName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return (
                                        titleNormalized.includes(searchValueNormalized)
                                    )
                                }).map((video) => {
                                    return (

                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>

                                        </a>
                                    )
                                })
                            }

                        </div>
                    </section>
                )


            })}
        </StyledTimeline>
    )
}