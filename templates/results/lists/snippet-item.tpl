<% if (typeof title != 'undefined') { %>
<div class="article-title">
	<span class="heading form-control-plaintext">
	<% if (URL) { %>
	<a href="<%= URL %>" target="_blank"><%= title %></a>
	<% } else { %>
	<%= title %>
	<% } %>
	</span>
</div>
<% } %>

<% if (typeof pubname != 'undefined') { %>
<i class="fa fa-newspaper-o"></i>
<span class="form-control-plaintext"><%= pubname %></span>
<% if (publisher) { %> published by <%= publisher %><% } %>
<% if (typeof coverDate != 'undefined') { %> in <%= coverDate %><% } %>
<% } %>

<% if (typeof authors != 'undefined') { %>
<i class="fa fa-user"></i><%= authors %>
<% } %>

<% if (typeof highlight != 'undefined') { %>
<div class="well">
	<%= highlight %>
</div>
<% } %>