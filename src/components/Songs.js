import React, {  useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Songs() {
    let [songs] = useState([
        {"id":8,"category":"game","name":"Mario Underwater","url":"files/mario/songs/underwater.mp3"},
        {"id":9,"category":"game","name":"Zelda Castle","url":"files/videogame/songs/zelda_castle.mp3"},
        {"id":10,"category":"game","name":"Zelda Outworld","url":"files/videogame/songs/zelda_outworld.mp3"},
    ]);

    const [statePlayButton, setState] = useState({
        play: false,
        isActive: true,
        users: null,
    });
    
    let [songActive, setSongActive] = useState(null)

    let audioRef = useRef(null);
    
    function setSingleSong(url, index) {
        audioRef.src = `https://assets.breatheco.de/apis/sound/${url}`;
        setSongActive(index);
        statePlayButton.play = true;
    }

    function playSong() {
        if (songActive !== null) { 
            audioRef.play();
            statePlayButton.play = true;
        }
    } 

    function pauseSong(){
        if(songActive !== null){
            audioRef.pause();
            statePlayButton.play = false;
        }
    }

    function nextSong() {
        let nextSong = songActive !== null ? songActive === songs.length - 1 ? 0 : songActive + 1 : 0;
        setSingleSong(songs[nextSong].url, nextSong);
        playSong();
    }
    function prevSong() {
        let prevSong = songActive !== null ? songActive === 0 ? songs.length - 1 : songActive - 1 : 0;
        setSingleSong(songs[prevSong].url, prevSong);
        playSong();
    }

    return (
        <>
            <div className="card-body bg-dark text-white">
                <ol>
                    {
                        !!songs ?
                            songs.map((song, i) => {
                                return <div key={i} className="list-group " id="list-tab" role="tablist" >
                                    <a className="list-group-item list-group-item-action text-white text-center bg-dark" id="list-home-list" data-toggle="list" href="#list-home" role="tab" onClick={() => setSingleSong(song.url,i)}>{song.id} {song.name}</a>
                                </div>
                            })
                            : "Cargando.."
                    }
                </ol>
            </div>
            <div className="card-footer text-center bg-dark">
                <audio ref={r => audioRef = r} autoPlay  />
                <div className="btn-group btn-group-lg " role="group" aria-label="Basic example">
                    <div className="anterior">
                        <button type="button" className="btn btn-dark btn-lg" onClick={prevSong}><i className="fas fa-caret-left"></i></button>
                    </div>
                    <div className="play">
                        <button id="playButton" type="button" className="btn btn-dark btn-lg" onClick={() => setState({ ...statePlayButton, play: statePlayButton.play })  }>{statePlayButton.play ? <i className="fas fa-pause" onClick={pauseSong}></i> : <i className="fas fa-play" onClick={playSong}></i>}</button>
                   </div>
                    <div className="next">
                        <button type="button" className="btn btn-dark btn-lg" onClick={nextSong} ><i className="fas fa-caret-right"></i></button>
                    </div>
                </div>
            </div>



        </>
    )






}

export default Songs;