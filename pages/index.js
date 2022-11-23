import styled from "styled-components";
import config from "../config.json";
import { CSSReset } from "../src/components/CssReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

const bg_color = '#000000'
const text_color = '#FFFFFF'
function HomePage() {

    return (
        <>
            <CSSReset/>
            <div style={{   
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu bgColor = {bg_color} textColor = {text_color}/>
                <Header />
                <Timline playList={config.playLists} />
            </div>
        </>
    );
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }

const StyledHeader = styled.div`
    background-color: ${bg_color};
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info{
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
    h2, p{
        color: ${text_color} ;
    }
`
function Header() {
    return (
        <StyledHeader>
            {/*<img src=""/>*/}
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

function Timline(props) {
    const playListName = Object.keys(props.playList);
    return (
        <StyledTimeline>
            {playListName.map((playListName) => {
                const video = props.playList[playListName];

                return (
                    <section key={playListName}>
                        <h2 style={{color: text_color}} >{playListName}</h2>
                        <div>
                            {video.map((video) => {
                                return(
                                    
                                    <a key={video.title} href={video.url} target="_blank">
                                        <img src={video.thumb} />
                                        <span style={{color: text_color}}>
                                            {video.title}
                                        </span>

                                    </a>
                                )
                            })}

                        </div>
                    </section>
                )


            })}
        </StyledTimeline>
    )
}