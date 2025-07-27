---
title: "TOOLS"
layout: layout.html
date: 2025-07-25
tags: post
---

<style>
  form#subnetForm {
    border: 2px solid #444;
    padding: 15px;
    max-width: 350px;
    border-radius: 8px;
    background: #f0f0f0;
  }
  form#subnetForm label {
    font-weight: bold;
    margin-top: 10px;
    display: block;
  }
  form#subnetForm input {
    width: 100%;
    padding: 6px;
    margin-top: 4px;
    border: 1px solid #999;
    border-radius: 4px;
    font-family: monospace;
    font-size: 1rem;
  }
  form#subnetForm button {
    margin-top: 12px;
    padding: 8px 16px;
    font-weight: bold;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
  }
  pre#result {
    margin-top: 25px;
    border: 2px solid #444;
    padding: 15px;
    max-width: 600px;
    background: #222;
    color: #eee;
    border-radius: 8px;
    font-family: monospace;
    font-size: 0.9rem;
    white-space: pre-wrap;
  }
</style>

# Simple Subnet Calculator

<form id="subnetForm">
  <label for="ip">IP address:</label>
  <input type="text" id="ip" name="ip" placeholder="e.g. 192.168.0.1" required />

  <label for="cidr">Subnet mask (CIDR):</label>
  <input type="number" id="cidr" name="cidr" min="1" max="30" placeholder="e.g. 24" required />

  <button type="submit">Calculate</button>
</form>

<pre id="result"></pre>

<script>
function ipToOctets(ip) {
  return ip.split('.').map(Number);
}

function octetsToIp(octets) {
  return octets.join('.');
}

function decToBin8(num) {
  return num.toString(2).padStart(8, '0');
}

function cidrToNetmask(cidr) {
  let mask = [];
  for (let i = 0; i < 4; i++) {
    if (cidr >= 8) {
      mask.push(255);
      cidr -= 8;
    } else {
      mask.push(256 - Math.pow(2, 8 - cidr));
      cidr = 0;
    }
  }
  return mask;
}

function andIpMask(ipOctets, maskOctets) {
  return ipOctets.map((oct, i) => oct & maskOctets[i]);
}

function orIpWildcard(ipOctets, wildcardOctets) {
  return ipOctets.map((oct, i) => oct | wildcardOctets[i]);
}

function maskToWildcard(maskOctets) {
  return maskOctets.map(oct => 255 - oct);
}

function calculateBroadcast(networkOctets, wildcardOctets) {
  return orIpWildcard(networkOctets, wildcardOctets);
}

function addOneIp(ipOctets) {
  let res = ipOctets.slice();
  for (let i = 3; i >= 0; i--) {
    if (res[i] < 255) {
      res[i]++;
      break;
    } else {
      res[i] = 0;
    }
  }
  return res;
}

function subOneIp(ipOctets) {
  let res = ipOctets.slice();
  for (let i = 3; i >= 0; i--) {
    if (res[i] > 0) {
      res[i]--;
      break;
    } else {
      res[i] = 255;
    }
  }
  return res;
}

function calculateHosts(cidr) {
  return Math.pow(2, 32 - cidr) - 2;
}

function validateIp(ip) {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return false;
  for (const p of parts) {
    const n = Number(p);
    if (isNaN(n) || n < 0 || n > 255) return false;
  }
  return true;
}

document.getElementById('subnetForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const ip = document.getElementById('ip').value;
  const cidr = Number(document.getElementById('cidr').value);

  const resultElem = document.getElementById('result');

  if (!validateIp(ip)) {
    resultElem.textContent = "Error: Invalid IP address.";
    return;
  }

  if (cidr < 1 || cidr > 30) {
    resultElem.textContent = "Error: CIDR must be between 1 and 30.";
    return;
  }

  const ipOctets = ipToOctets(ip);
  const netmaskOctets = cidrToNetmask(cidr);
  const wildcardOctets = maskToWildcard(netmaskOctets);
  const networkOctets = andIpMask(ipOctets, netmaskOctets);
  const broadcastOctets = calculateBroadcast(networkOctets, wildcardOctets);
  const hostMinOctets = addOneIp(networkOctets);
  const hostMaxOctets = subOneIp(broadcastOctets);
  const hosts = calculateHosts(cidr);

  let output = "";
  output += `Address:   ${ip.padEnd(15)}  ${ipOctets.map(decToBin8).join('.')}\n`;
  output += `Netmask:   ${netmaskOctets.join('.').padEnd(15)}= ${cidr}  ${netmaskOctets.map(decToBin8).join('.')}\n`;
  output += `Wildcard:  ${wildcardOctets.join('.').padEnd(15)}  ${wildcardOctets.map(decToBin8).join('.')}\n`;
  output += `Network:   ${octetsToIp(networkOctets)}/${cidr}  ${networkOctets.map(decToBin8).join('.')} (Classless)\n`;
  output += `Broadcast: ${octetsToIp(broadcastOctets).padEnd(15)}  ${broadcastOctets.map(decToBin8).join('.')}\n`;
  output += `HostMin:   ${octetsToIp(hostMinOctets).padEnd(15)}  ${hostMinOctets.map(decToBin8).join('.')}\n`;
  output += `HostMax:   ${octetsToIp(hostMaxOctets).padEnd(15)}  ${hostMaxOctets.map(decToBin8).join('.')}\n`;
  output += `Hosts/Net: ${hosts}  (Usable hosts)\n`;

  resultElem.textContent = output;
});
</script>

---

You can also use this online calculator:  
https://jodies.de/ipcalc

