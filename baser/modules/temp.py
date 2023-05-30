from PIL import Image
import os
import shutil

output = './temp/'

def saveIm(path):
    im = Image.open(path)
    fileName = os.path.basename(path)
    im.save(output + 'covers/' + fileName, 'JPEG')
    return fileName

def clear():
    for f in os.listdir(output + 'covers/'):
        os.remove(os.path.join(output + 'covers/', f))
    for f in os.listdir(output + 'audio/'):
        os.remove(os.path.join(output + 'audio/', f))

def saveAudio(path):
    fileName = os.path.basename(path)
    shutil.copy2(path, output + 'audio/' + fileName)
    return fileName



