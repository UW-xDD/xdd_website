<% if (typeof title != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Title</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext">
		<% if (link && link.length > 0) { %>
		<a href="<%= link[0].url %>"><%= title %></a>
		<% } else { %>
		<%= title %>
		<% } %>
		</span>
	</div>
</div>
<% } %>

<% if (typeof journal != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Journal</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= journal %></span>
		<% if (publisher) { %> published by <%= publisher %><% } %>
		<% if (year) { %> in <%= year %><% } %><% if (pages) { %><% if (pages.includes('--')) { %>, pages <%= pages.replace('--', '-') %><% } else { %>, page <%= pages %><% } %><% } %>
	</div>
</div>
<% } %>

<% if (typeof author != 'undefined' && author != '') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Author</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext">
		<% for (var i = 0; i < author.length; i++) { %>
		<% if (i > 0) { %>, <br /><% } %>
		<%= author[i].name %>
		<% } %>
		</span>
	</div>
</div>
<% } %>