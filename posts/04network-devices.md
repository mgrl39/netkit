---
title: "Network Devices Explained"
layout: layout.html
date: 2025-07-27
tags: post
---

## Resume
```c
SWITCH -> Responsible for distributing packets between devices within the same network - usually, a local one (called LAN).

ROUTER -> Responsible for connecting multiple networks together. Every router has an interface for every network it connects it to.

ROUTING TABLE -> Simple data tablee stored in a router or network host that lists all the routes to a particular network destsination.
```

## Switch
A switch is a network device that connects multiple devices (such as computers, printers and servers), within a single local network, often called a LAN (Local Area Network). Its main job is to receive data packets and forward them only to the specific device they are intended for, making communication inside the network efficient and fast.

Unlike the router, which can connect different networks together (for exemple, your home network to the internet), a traditional switch works only inside one network. It operates at the data link layer (Layerr 2) of the networking model, using its physical ports to receive and send data frames within the same local network. Because of this, a switch cannot route aor send data directly between different networks.

Switches do have physical interfaces, called ports, where devices connect via Ethernet cables. But they do not have IP addresses or routing capabilities like routers do. If you want to connect multiple networks or enable communication outside the local network, you need a router or a Layer 3 switch, which combines switching and routing functions.

So explaining this again:

- A Layer 2 managed switch is designed to forward traffic between network hosts within the same subnet, based on the entries in its MAC address table. 

- A Layer 3 managed switch is capable of forwarding traffic between different subnets, using a map of the IP network maintained in its routing table.

```
Simple example:
Imagine you have a small office with several computers and printers. All these devices need to talk to each other to share files and print documents. To connect them all, you use a SWITCH. The switch acts like a smart traffic director inside the office, making sure data sent from one computer goes only to the intended device, not to everyone. This keeps the network fast and efficient.

Now, if someone in the office wants to access a website on the internet or send an email outside the office, their computer needs to talk to a device that connects the office network to the wider internet. This is a ROUTER. The router takes data from the office network and forwards it to other networks, like your Internet Service Provider (ISP), and then the internet. It also directs incoming internet data back to the correct computer inside the office.

To summarize:
- The SWITCH connects devices within the same local network and forwards data based on hardware addresses (MAC addresses).
- The ROUTER connects different neetworks together, forwarding data based on IP addresses, enabling communication between your local network and external networks like the internet.
 
(A layer 3 switch can route traffic between different local subnets inside a network but does not replace a router for internet access).
```
## Router
Router connects multiple networks together. The router has an interface for each network it connects to.

Since the router separates different networks, the range of possible IP addresses on one of its interafaaces must not overlap with the range of its other interfaces. An overlap in the IP adddress range would imply that the interfaces are on the same network.

## Routing Table
