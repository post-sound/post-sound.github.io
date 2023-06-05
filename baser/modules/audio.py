from pydub import AudioSegment
import shutil
from os import path

output = './data/audio/'

def save(src, title, fileName):
    sound = AudioSegment.from_file(src)
    duration = sound.duration_seconds
    ex = path.splitext(fileName)[1]
    shutil.copy2(src, output + title + ex)
    return (duration, ex)