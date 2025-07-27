---
title: "Introduction"
layout: layout.html
date: 2025-07-25
tags: post
---

This is a general guide designed to help you discover networking concepts.  
It aims to facilitate understanding of how to configure small-scale networks.

## The real intro

In any network, devices like computers, phonees, or printers need to talk each other to share information. But to understand each other, they need common rules. These rules are called **communication protocols**. (basically, languages that devices use to send and receive data correctly. You can read more about protocols [here](https://en.wikipedia.org/wiki/Communication_protocol).

One of the most important sets of rules is called **TCP/IP**. This is a group of protocols that work together to make sure data travels properly from one device to another. The name **TCP/IP** comes from two main protocols inside this group:
- **TCP** (Transmission Control Protocol), which makes sure data arrives complete and in order, like a reliable mailman.
- **IP** (Internet Protocol), which takes care of addressing and delivering packets of data, like the postal system deciding where to send each letter.

Together, TCP/IP helps all devices on the internet and other networks communicate smoothly, no matter their brand or system.
When you set up a device on a network using TCP/IP, one important thing to configure is the **subnet mask**. Think of the subnet mask as a way the device uses to figure out who is "close" (inside the same network) and who is "far" (outside the network).

Here's how it works:
- Every device on a network has an **IP address** (like its home address)
- The subnet mask tells the device which part of that IP address refers to the network itself (the "street" or "neighborhood") and which part refers to the specific device (the "house number").

By comparing the subnet mask and the IP address of the device you want to talk to, your device can tell if it's inside your local network or somewhere else.

If the other device is on your local network, you device talks to it directly. But if it's outside your local network, your device sends the data to a **gateway** (usually a router) which forwards it outside your network, like sending a letter through the post office to a different city.

The information about where to send data for addresses outside the local network is stored in something called the **routing table** inside your device. This table is like a GPS for your data, telling it the best path to reach its destination.

---

## Credits

This guide is based on the following repositories:

- [lpaube/NetPractice](https://github.com/lpaube/NetPractice)  
- [caroldaniel/42sp-cursus-netpractice](https://github.com/caroldaniel/42sp-cursus-netpractice)  
- [ricardoreves/42-net-practice](https://github.com/ricardoreves/42-net-practice)  
- [ablaamim/Netpractice](https://github.com/ablaamim/Netpractice)  

**License: MIT License.**
