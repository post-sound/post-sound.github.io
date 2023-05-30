import sys
import eel
import os
import tkinter as tk
from tkinter import filedialog as fd
sys.path.insert(0,'./modules')
import temp
import audio
import image

temp.clear()

eel.init(".")

root = tk.Tk()
root.wm_attributes('-topmost', 1)
root.withdraw()

tempPath = './temp/'

@eel.expose
def openCover():
    filePath = fd.askopenfilename(parent = root, filetypes = [
        ('image', '.jpeg'),
        ('image', '.jpg'),
    ])
    if filePath == '':
        return 0
    fileName = temp.saveIm(filePath)
    print(fileName)
    return(fileName)

@eel.expose
def resetForm():
    temp.clear()

@eel.expose
def openAudio():
    filePath = fd.askopenfilename(parent = root)
    if filePath == '':
        return 0
    fileName = temp.saveAudio(filePath)
    print(fileName)
    return(fileName)

@eel.expose
def saveImage(fileName, title):
    src = tempPath + 'covers/' + fileName
    image.save(src, title)
    return

@eel.expose
def saveAudio(fileName, title):
    src = tempPath + 'audio/' + fileName
    duration = audio.save(src, title)
    return duration

@eel.expose
def removeFile(fileName):
    os.remove(fileName)
    return

@eel.expose
def jsonWriter(json):
    base = open('./data/albums.json', 'w', encoding='utf-16')
    base.write(json,)

eel.start("view.html")




