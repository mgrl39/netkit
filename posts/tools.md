---
title: "TOOLS"
layout: layout.html
date: 2025-07-25
tags: post
---

<style>
  /* Solo estilamos el output para que encaje con dark mode pico */
  pre#result {
    background-color: #1e1e1e;
    border: 1px solid #444;
    padding: 1em;
    border-radius: 6px;
    font-family: monospace;
    color: #ccc;
    white-space: pre-wrap;
    max-width: 600px;
    margin-top: 1em;
  }
  /* Inputs y botón muy neutros, que no rompan */
  input, button {
    font-family: inherit;
    font-size: 1rem;
    margin-top: 0.25em;
    padding: 0.3em 0.6em;
    border-radius: 4px;
    border: 1px solid #555;
    background: transparent;
    color: inherit;
  }
  button:hover {
    border-color: #888;
    cursor: pointer;
  }
  label {
    display: block;
    margin-top: 1em;
  }
</style>

<form id="subnetForm" autocomplete="off">
  <label for="ip">IP address:</label>
  <input type="text" id="ip" name="ip" placeholder="e.g. 192.168.0.1" required />

  <label for="mask">Subnet mask (CIDR or decimal):</label>
  <input type="text" id="mask" name="mask" placeholder="e.g. 24 or 255.255.255.0" required />

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

// Función que convierte máscara decimal a CIDR
function netmaskDecimalToCIDR(mask) {
  const octets = ipToOctets(mask);
  let binaryStr = '';
  for (const o of octets) {
    if (o < 0 || o > 255) return null;
    binaryStr += decToBin8(o);
  }
  // Contar los bits 1 seguidos desde el inicio
  const firstZero = binaryStr.indexOf('0');
  if (firstZero === -1) return 32; // máscara completa
  // Asegurarse que tras el primer 0 no hay más 1s
  if (binaryStr.slice(firstZero).includes('1')) return null; // no válida
  return firstZero;
}

// Convierte CIDR a máscara decimal
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

document.getElementById('subnetForm').addEventListener('submit', e => {
  e.preventDefault();

  const ip = document.getElementById('ip').value.trim();
  const maskInput = document.getElementById('mask').value.trim();

  const resultElem = document.getElementById('result');

  if (!validateIp(ip)) {
    resultElem.textContent = "Error: Invalid IP address.";
    return;
  }

  // Interpretar maskInput, puede ser CIDR o decimal máscara
  let cidr = null;
  if (/^\d+$/.test(maskInput)) {
    // Solo número -> CIDR
    cidr = Number(maskInput);
    if (cidr < 1 || cidr > 30) {
      resultElem.textContent = "Error: CIDR must be between 1 and 30.";
      return;
    }
  } else if (/^\d{1,3}(\.\d{1,3}){3}$/.test(maskInput)) {
    // Máscara decimal
    cidr = netmaskDecimalToCIDR(maskInput);
    if (cidr === null || cidr < 1 || cidr > 30) {
      resultElem.textContent = "Error: Invalid subnet mask decimal.";
      return;
    }
  } else {
    resultElem.textContent = "Error: Mask must be CIDR number or decimal format.";
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
  output += `Network:   ${octetsToIp(networkOctets)}/${cidr}  ${networkOctets.map(decToBin8).join('.')} \n`;
  output += `Broadcast: ${octetsToIp(broadcastOctets).padEnd(15)}  ${broadcastOctets.map(decToBin8).join('.')}\n`;
  output += `HostMin:   ${octetsToIp(hostMinOctets).padEnd(15)}  ${hostMinOctets.map(decToBin8).join('.')}\n`;
  output += `HostMax:   ${octetsToIp(hostMaxOctets).padEnd(15)}  ${hostMaxOctets.map(decToBin8).join('.')}\n`;
  output += `Hosts/Net: ${hosts}  (Usable hosts)\n`;

  resultElem.textContent = output;
});
</script>

