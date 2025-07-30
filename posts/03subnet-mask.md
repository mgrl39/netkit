---
title: "Subnet Mask"
layout: layout.html
date: 2025-07-27
tags: post
---

<style> table, th, td { border: 2px solid #222; border-collapse: collapse; padding: 6px; } </style> 

A subnet mask is a 32 bits (4 bytes) address used to distinguish between a network address and a host address in the IP address. **It defines the range of IP addresses that can be used within a network or a subnet**.

<img src="/assets/images/client.png" alt="Subnet Mask"
     style="display: block; margin: auto; width: 50%; border-radius: 2.5%;" />

## Finding the network address
The *Interface A1* above has the following properties:
```
IP address | 104.198.241.125
Mask       | 255.255.255.128
```
To determine which portion of the IP address is the network address, we need to apply the mask to the IP address. Let's first covert the mask to its binary form:
```
Mask | 11111111.11111111.11111111.10000000
```
The bits of a mask that are 1 represent the network address, while the remaining bits of a mask that are 0 represent the host address. Let's convert the IP address to its binary form:
```
IP address | 01101000.11000110.11110001.01111101
Mask       | 11111111.11111111.11111111.10000000
```
We can now apply the mask to the IP address through a bitwise AND to find the network address of the IP:
```
Network address | 01101000.11000110.11110001.00000000
```
Which translates to a network address of `104.198.241.0`.

### Finding the range of host addresses
To determine what host addresses we can use on our network, we have to use the bits of our IP address dedicated to the host address. Let's use our previous IP address and mask:
```
IP address | 01101000.11000110.11110001.01111101
Mask       | 11111111.11111111.11111111.10000000
```
The possible range of our hostt addresses is expected through the last 7 bits of the mask which are all 0.
Therefore, the range of host addresses is:
```
BINARY  | 00000000 - 11111111
DECIMAL | 0 - 127
```
To get the range of possible IP addresses for our network, we add the range of host addresses to the network address. Our range of possible IP addresses become `104.198.241.0 - 104.198.241.127`.

_HOWEVER_, the extremities of the range are reserved for specific uses and cannot be given to an interface:
```
104.198.241.0   | Reserved to represent the network address.
104.198.241.127 | Reserved as the broadcast address; used to send packets to all hosts of a network.
```
Therefore, our real IP range becomes `104.198.241.1 - 104.198.241.126`, which could have been found using an [IP calculator](https://netkit.doncom.me/posts/05calculator/)

## CIDR Notation (/24)
The maask can also be represented with the **Classless Inter-Domain Routing** (CIDR).

This form represents the mask as a slash `/`, followed by the number of bits that serve as the network address (Host Bits).

Therefore, the mask in the example above of `255.255.255.128`, is equivalent to mask of: `/25` using the CIDR notation, since 25 bits out of 32 bits represents the network address.

---

| Subnet Mask | CIDR | Binary Notation | Network Bits | Host Bits | Available Addresses |
| ----------- | ---- | --------------- | ------------ | --------- | ------------------- |
| 255.255.255.255 | /32 | 11111111.11111111.11111111.11111111 | 32 | 0 | 1 |
| 255.255.255.254 | /31 | 11111111.11111111.11111111.11111110 | 31 | 1 | 2 |
| 255.255.255.252 | /30 | 11111111.11111111.11111111.11111100 | 30 | 2 | 4 |
| 255.255.255.248 | /29 | 11111111.11111111.11111111.11111000 | 29 | 3 | 8 |
| 255.255.255.240 | /28 | 11111111.11111111.11111111.11110000 | 28 | 4 | 16 |
| 255.255.255.224 | /27 | 11111111.11111111.11111111.11100000 | 27 | 5 | 32 |
| 255.255.255.192 | /26 | 11111111.11111111.11111111.11000000 | 26 | 6 | 64 |
| 255.255.255.128 | /25 | 11111111.11111111.11111111.10000000 | 25 | 7 | 128 |
| 255.255.255.0   | /24 | 11111111.11111111.11111111.00000000 | 24 | 8 | 256 |
| 255.255.254.0   | /23 | 11111111.11111111.11111110.00000000 | 23 | 9 | 512 |
| 255.255.252.0   | /22 | 11111111.11111111.11111100.00000000 | 22 | 10 | 1024 |
| 255.255.248.0   | /21 | 11111111.11111111.11111000.00000000 | 21 | 11 | 2048 |
| 255.255.240.0   | /20 | 11111111.11111111.11110000.00000000 | 20 | 12 | 4096 |
| 255.255.224.0   | /19 | 11111111.11111111.11100000.00000000 | 19 | 13 | 8192 |
| 255.255.192.0   | /18 | 11111111.11111111.11000000.00000000 | 18 | 14 | 16384 |
| 255.255.128.0   | /17 | 11111111.11111111.10000000.00000000 | 17 | 15 | 32768 |
| 255.255.0.0     | /16 | 11111111.11111111.00000000.00000000 | 16 | 16 | 65536 |
| 255.254.0.0     | /15 | 11111111.11111110.00000000.00000000 | 15 | 17 | 131072 |
| 255.252.0.0     | /14 | 11111111.11111100.00000000.00000000 | 14 | 18 | 262144 |
| 255.248.0.0     | /13 | 11111111.11111000.00000000.00000000 | 13 | 19 | 524288 |
| 255.240.0.0     | /12 | 11111111.11110000.00000000.00000000 | 12 | 20 | 1048576 |
| 255.224.0.0     | /11 | 11111111.11100000.00000000.00000000 | 11 | 21 | 2097152 |
| 255.192.0.0     | /10 | 11111111.11000000.00000000.00000000 | 10 | 22 | 4194304 |
| 255.128.0.0     | /9  | 11111111.10000000.00000000.00000000 | 9  | 23 | 8388608 |
| 255.0.0.0       | /8  | 11111111.00000000.00000000.00000000 | 8  | 24 | 16777216 |
| 254.0.0.0       | /7  | 11111110.00000000.00000000.00000000 | 7  | 25 | 33554430 |
| 252.0.0.0       | /6  | 11111100.00000000.00000000.00000000 | 6  | 26 | 67108862 |
| 248.0.0.0       | /5  | 11111000.00000000.00000000.00000000 | 5  | 27 | 134217726 |
| 240.0.0.0       | /4  | 11110000.00000000.00000000.00000000 | 4  | 28 | 268435454 |
| 224.0.0.0       | /3  | 11100000.00000000.00000000.00000000 | 3  | 29 | 536870910 |
| 192.0.0.0       | /2  | 11000000.00000000.00000000.00000000 | 2  | 30 | 1073741822 |
| 128.0.0.0       | /1  | 10000000.00000000.00000000.00000000 | 1  | 31 | 2147483646 |
| 0.0.0.0         | /0  | 00000000.00000000.00000000.00000000 | 0  | 32 | 4294967294 |


---
Did you undestand everything? I will explain again:

A subnet mask is a 32-bit number created by setting host bits to all 0s and setting network bits to all 1s.

In this way, the subnet mask separates the IP address into the network and host address.

The "255" address is always assigned to a broadcaast address, and the "0" address is always assigned to a netwrok address. Neither can be assigend to hosts, as they are reserved for these special purposes.


