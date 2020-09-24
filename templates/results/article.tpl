<% if (typeof type != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Type</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= type %></span>
	</div>
</div>
<% } %>

<% if (typeof title != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Title</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= title %></span>
	</div>
</div>
<% } %>

<% if (typeof journal != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Journal</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= journal %></span>
	</div>
</div>
<% } %>

<% if (typeof link != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Link</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext">
		<% for (var i = 0; i < link.length; i++) { %>
		<a href="<%= link[i].url %>"><%= link[i].url %></a>
		<% } %>
		</span>
	</div>
</div>
<% } %>

<% if (typeof publisher != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Publisher</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= publisher %></span>
	</div>
</div>
<% } %>

<% if (typeof author != 'undefined') { %>
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

<% if (typeof pages != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Pages</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= pages %></span>
	</div>
</div>
<% } %>

<% if (typeof number != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Number</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= number %></span>
	</div>
</div>
<% } %>

<% if (typeof year != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Year</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= year %></span>
	</div>
</div>
<% } %>