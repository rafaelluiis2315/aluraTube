import styled from "styled-components";
import config from "../config.json";
import { CssReset } from "../src/components/Css_reset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";


function HomePage() {

    return (
        <>
            <CssReset/>
            <div style={{   
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu />
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
                        <h2>{playListName}</h2>
                        <div>
                            {video.map((video) => {
                                return(
                                    
                                    <a key={video.title} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
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