import audios from "./data.js";
import { path, secondsToMinutes } from "./utils.js";
import elements from "./playerElements.js";

export default {
    audioData: audios,
    currentAudio: {},
    currentPlaining: 0,
    isPlayning: false,

    start() {
        elements.get.call(this);

        this.update();
    },

    play() {
        this.isPlayning = true;
        this.audio.play();
        this.playPause.innerText = "pause";
        this.playPause.style.pulse = "hide";

    },

    pause() {
        this.isPlayning = false;
        this.audio.pause();
        this.playPause.innerText = "play_arrow";

    },

    togglePlayPause() {
        if (this.isPlayning) {
            this.pause();
        } else {
            this.play();
        }

    },

    toggleMute() {

        this.audio.muted = !this.audio.muted;
        this.mute.innerText = this.audio.muted ? "volume_off" : "volume_up";
    },

    next() {
        this.currentPlaining++;

        if (this.currentPlaining == this.audioData.length) this.restart();
        this.update();
        this.play();
    },

    proximo() {
        this.currentPlaining++;

        this.audio.pause();

        if (this.currentPlaining == this.audioData.length) this.restart();
        this.update();
        this.play();


    },

    setVolume(value) {
        this.audio.volume = value / 100;
    },

    setSeek(value) {
        this.audio.currentTime = value;
    },

    timeUpdate() {
        this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
        this.seekbar.value = this.audio.currentTime;
    },

    update() {
        this.currentAudio = this.audioData[this.currentPlaining];
        this.cover.style.background = `url('${path(this.currentAudio.cover)}') no-repeat center center / cover`;
        this.title.innerText = this.currentAudio.title;
        this.artist.innerText = this.currentAudio.artist;
        elements.createAudioElement.call(this, path(this.currentAudio.file));
        this.audio.onloadeddata = () => {
            elements.actions.call(this);

        };


    },

    restart() {
        this.currentPlaining = 0;
        this.update();

    }
};

