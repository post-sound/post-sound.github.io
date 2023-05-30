from pydub import AudioSegment

output = './data/audio/'

def save(src, title):
    sound = AudioSegment.from_file(src)
    duration = sound.duration_seconds
    sound.export(
        output + title,
        format="mp3", bitrate="128k")
    return duration