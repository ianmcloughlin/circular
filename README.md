# Circular: a simple drawing app for fun

[Live demo: https://ianmcloughlin.github.io/circular/](https://ianmcloughlin.github.io/circular/)

This is a static web application that draws circles in different sizes and
colours when the mouse moves or you drag on a touch screen device. Clicking
with the left mouse button will stop and start the drawing.

# Python

If you have python 3 installed you can run this in the project directory:

```bash
python -m http.server 8000
```

Then on your machine you should be able to see the app at:

[http://127.0.0.1:8000](http://127.0.0.1:8000)


# Docker

You can use the included Dockerfile to create an image for this repository:

```bash
docker build -t circular-image .
```

Then you can run a container from the image:

```bash
docker run --name circular-container -d -p 8000:80 circular-image
```

Then on your host machine you should be able to see the app at:

[http://127.0.0.1:8000](http://127.0.0.1:8000)

