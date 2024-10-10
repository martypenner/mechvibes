// ==================================================
// universal play function
export function playSound(sound_id, volume, current_pack) {
  if (current_pack.audio === undefined) {
    // sound for this pack hasn't been loaded
    return;
  }
  const play_type = current_pack.key_define_type
    ? current_pack.key_define_type
    : "single";
  const sound =
    play_type == "single" ? current_pack.audio : current_pack.audio[sound_id];
  if (!sound) {
    return;
  }

  if (active_volume) {
    // dynamic volume adjustment
    log.silly(`Volume: ${volume}`);
    log.silly(`System Volume: ${system_volume}`);

    const adjustedVolume = volume * (100 / system_volume);

    log.silly(`Adjusted Volume: ${adjustedVolume}`);
    log.silly(`Result Volume: ${adjustedVolume / 100}`);

    sound.volume(1);
    Howler.masterGain.gain.setValueAtTime(
      Number(adjustedVolume / 100),
      Howler.ctx.currentTime
    );
  } else {
    sound.volume(1);
    Howler.masterGain.gain.setValueAtTime(
      Number(volume / 100),
      Howler.ctx.currentTime
    );
  }

  if (play_type == "single") {
    sound.play(sound_id);
    console.log(current_pack.audio);
  } else {
    sound.play();
  }
}
