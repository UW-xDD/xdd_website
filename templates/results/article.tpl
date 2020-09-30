<% if (typeof title != 'undefined') { %>
<div class="article-title">
	<span class="heading form-control-plaintext">
	<% if (link && link.length > 0) { %>
	<a href="<%= link[0].url %>"><%= title %></a>
	<% } else { %>
	<%= title %>
	<% } %>
	</span>
</div>
<% } %>

<% if (typeof journal != 'undefined') { %>
<i class="fa fa-newspaper-o"></i>
<span class="form-control-plaintext"><%= journal %></span>
<% if (publisher) { %> published by <%= publisher %><% } %>
<% if (typeof year != 'undefined') { %> in <%= year %><% } %><% if (pages) { %><% if (pages.includes('--')) { %>, <i class="fa fa-file"></i> pages <%= pages.replace('--', '-') %><% } else { %>, <i class="fa fa-file"></i> page <%= pages %><% } %><% } %>
<% } %>

<% if (typeof author != 'undefined' && author != '') { %>
<i class="fa fa-user"></i>
<% for (var i = 0; i < author.length; i++) { %><% if (i > 0) { %>; <% } %><%= author[i].name %><% } %>
<% } %>