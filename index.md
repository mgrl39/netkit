---
title: "🌐 NetKit"
layout: layout.html
description: "🌐 NetKit - General guide designed to help you discover networking concepts. 🌐🛜ᯤ📶"
permalink: /
canonicalUrl: "https://netkit.doncom.me/"
---

General guide designed to help you discover networking concepts

## 📝 Progress

<div style="margin-bottom: 2rem;">
<label for="progress">Progress: <span id="readCount">0</span>/<span id="totalCount">?</span> chapters</label>
<progress id="progressBar" max="{{ collections.post | size }}" value="0" style="width: 100%; height: 1rem; border-radius: 10px;"></progress>
</div>

## 📝 Chapters

<ul style="list-style: none; padding: 0;">
{% for post in collections.post %}
<li style="margin-bottom: 1rem;">
<a href="{{ post.url | url }}" style="font-size: 1.1rem; font-weight: 500;">
{{ post.data.title }}
</a><br />
<small style="color: var(--muted);">Published on {{ post.date | formatDate }}</small>
</li>
{% endfor %}
</ul>

<script>
<script>
  const read = JSON.parse(localStorage.getItem("readChapters") || "[]");
  const total = document.querySelectorAll("ul li").length;
  document.getElementById("readCount").textContent = read.length;
  document.getElementById("totalCount").textContent = total;
  document.getElementById("progressBar").value = read.length;
  document.getElementById("progressBar").max = total;
</script>
</script>
