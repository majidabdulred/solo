from turtle import *
import time
import math
def start(sx=0,sy=0):
        reset()
        tracer(True)
        up()
        backward(sx)
        rf(sy)
        l(90)
        down()
        width(3)
        color("Red")

def add():
    up()
    forward(10)
    down()

def s1():
        up()
        l(90)
        f(50)
        down()

def s2():
        up()
        f(30)
        lf(50)
        l(90)
        down()


def l(x):
        left(x)
def r(x):
        right(x)
def f(x):
        forward(x)
def r(x):
        right(x)
def lf(x):
        left(90)
        forward(x)
def rf(x):
        right(90)
        forward(x)

class flag:

    def __init__(self):
        speed(7)
        start(sx=200,sy=150)
        color("brown")
        speed(3)
        width(5)
        lf(350)
        up()
        backward(10)
        rf(3)
        l(90)
        down()
        speed(2)
        width(1)
        begin_fill()
        self.h=150
        self.w=33
        
    def india(self):
        color("#ff7700")
        rf(self.h)
        rf(self.w)
        rf(self.h)
        end_fill()
        speed(3)
        color("White")
        r(180)
        f(self.h)
        rf(self.w)
        rf(self.h)
        r(180)
        speed(2)
        color("Green")
        begin_fill()
        f(self.h)
        rf(self.w)
        rf(self.h)
        end_fill()
        speed(4)
        up()
        r(180)
        f(91.5)
        lf(49.5)
        down()
        speed(1)
        color("blue")
        circle(16.5,360)
        speed(2)
        for i in range(12):
            lf(33)
            l(90)
            circle(16.5,15)
            if i==3:
                    speed(7)
        self.end()

    def libiya(self):
        color("green")
        begin_fill()
        rf(self.h)
        rf(3*self.w)
        rf(self.h)
        end_fill()
        speed(3)
        up()
        lf(100)
        speed(4)
        f(100)
        lf(233)
        down()
    def end(self):
        up()
        speed(3)
        f(150)
        speed(4)
        f(100)
        lf(200)
        down()

j=flag()
j.india()


