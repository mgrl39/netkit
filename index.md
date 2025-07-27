---
title: "NetKit"
layout: layout.html
description: "NetKit - Ultra-light and modern blog built with 11ty featuring a professional dark theme."
permalink: /
canonicalUrl: "https://netkit.doncom.me/"
---

Welcome to my ultra-light and modern blog built with 11ty and a professional dark theme.

## 📝 Recent Posts

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
