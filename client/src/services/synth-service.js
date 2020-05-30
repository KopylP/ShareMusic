import * as Tone from "tone";

export default class SynthService {
    synth = new Tone.Synth().toMaster();
    triggerAttack(key) {
        this.synth.triggerAttack(key);
    }
    triggerRelease() {
        this.synth.triggerRelease();
    }
}