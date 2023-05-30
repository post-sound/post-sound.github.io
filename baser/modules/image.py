from PIL import Image

output = './data/cover/'

def save(src, title):
    img = Image.open(src)
    resize(img, title, (1000, 1000))
    resize(img, title, (350, 350))
    resize(img, title, (60, 60))
    return


def resize(img, title, size):
    img.thumbnail(size, Image.Resampling.LANCZOS)
    img.save(output + str(size[0]) + '/' + title, 'JPEG')
    return