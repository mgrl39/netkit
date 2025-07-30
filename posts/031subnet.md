---
title: "More about subnets"
layout: layout.html
date: 2025-07-30
tags: post
---
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
TODO: MEJORAR ESTO
<style> table, th, td { border: 2px solid #222; border-collapse: collapse; padding: 6px; } </style> 

Subnet is the part most important about the code so this is a second explication:

## What is a subnet?

A subnet or a subnetwork is a network inside a network. Subnets make nettwroks more efficient.
Subnetting is the process of stealing bits from the HOS part of IP address in order to divide the large network into smaller ones called subnetts.
After subnetting, we end up with NETWORK SUBNET HOST fields, and we always reserve an IP address t identify the subnet and another one to identify the broadcast subnet address, and through subnetting, nettwork traffic can trave a shorter distance without passing through unnecesary routes to reach its destination.

## How to calculate a subnet mask from IP address step b step.

We will work with the IP address --> `10.20.4.13/29`

### Step 1: Find subnet number:
```
Substract prefix number from /32
32 - 29 = 3

Calculate Subnet Mask:
8 bits - 3 bits = 5 bits (Network bits turned on)

You might be asking why 9 bits, 8 bits are required for each octet.

| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | 
| 128     | 64      | 32      | 16      | 8       | 4       | 2       | 1       |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | 
| 1       | 1       | 1       | 1       | 1       | 0       | 0       | 0       |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | 
| 128 +   | 64 +    | 32 +    | 16 +    | 8 +     | 0 +     | 0 +     | 0       |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- | 

128 + 64 + 32 + 16 + 8 => 248

SUBNET MASK: 255.255.255.248
```
### Step 2: Find subnet size:
```
Raise 2 to the power of deducation (8 - 3 = 5) -> Let's call it n.

2^n = subnet size.
2^3 = subnet sizes for each subnet.
2 * 2 * 2 = 8

NOTE: 8 is the block size for the subnet, so for example:
the increments will now be 0 8 16 32 40 and so on (we add 8 each time)
```
### Step 3: Find Broadcast address:
```
Subnet size - 1
(2^n) - 1 = Broadcast address --> 2^3 - 1 = (8 - 1) = 7
```
## Step 4: Locate IP address subnet:
```
Identify subnet block for IP address:
-> Where in each increment is the address 10.20.4.13/29 located (0 8 16 32 40)?

13 falls between 8 and 16 and therefore the address is in the valid host range of teh subnet 10.20
```
## Step 5: Calculate the valid hosts:
```
Subnet size - 2
(2^n) - 2 = Valid host range
(2^3) - 2 = (2*2*2) - 2 = 8 - 2 = 6
```
And from thes steps, we can know 4 important things:
```
Subnet Address --> 10.20.4.8/29
Min host Address --> 10.20.4.9/29
Max host Address --> 10.20.4.14/29
Broadcast Address --> 10.20.4.15/29
```
