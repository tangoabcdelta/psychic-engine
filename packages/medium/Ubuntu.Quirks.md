# Ubuntu Quirks

##### For all sound related

```bash
sudo apt-get install ffmpeg
```

##### Disable Screenshot sound (Camera Shutter effect)

Either disable system sound effects or, I am assuming you want to disable only the screen shot sound, move or rename /usr/share/sounds/freedesktop/stereo/camera-shutter.oga

```bash
sudo mv /usr/share/sounds/freedesktop/stereo/camera-shutter.oga /usr/share/sounds/freedesktop/stereo/camera-shutter-disabled.oga

```
